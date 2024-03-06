import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import T from "T";
import { NETSMARTZ_THEME_COLOR, TEXT } from "theme/colors";
import { useLazyGetQuestionQuery } from "api/getQuestion";
import { errorHandler } from "utils/errorHandler";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { APP_PREFIX } from "router/routes";
import { GET_SIZE } from "utils/responsive";
import { useSubmitAudioMutation } from "api/submitAudio";

const InterviewQuestions = () => {
  const { isXs, isMd } = GET_SIZE();
  const [getQuestion, { data: question }] =
    useLazyGetQuestionQuery();
  const [submitAudio, audioData] = useSubmitAudioMutation();
  const navigate = useNavigate();
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioFormData, setAudioFormData] = useState(new FormData());
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      questionsList: [],
      answersList: [],
      questionStep: 0,
    }
  );

  const { questionsList, answersList, questionStep } = localState;

  const [searchParams, setSearchParams] = useSearchParams();

  const quesStep = +searchParams.get("ques");
  useEffect(() => {
    if (quesStep == null) return;
    console.log("first123");
    getQuestion(quesStep)
      .unwrap()
      .then((res) => {
        console.log("inside ques");
        const questions = [...questionsList];
        questions.push(res?.question);
        setLocalState({ questionsList: questions });
      })
      .catch(errorHandler);
  }, [quesStep]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        // alert(err.message);
        alert("Microphone access permission required !");
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  console.log("audioData", audioData);

  useEffect(() => {
    getMicrophonePermission();
  }, []);
  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      audioFormData.append(`audio_${questionStep}`, audioBlob, "recording.wav");
      let answersListCopy = [...answersList];
      answersListCopy.push(URL.createObjectURL(audioBlob));
      setAudioFormData(audioFormData);
      setLocalState({ answersList: answersListCopy });
      setAudioChunks([]);
    };
  };
  const handleNext = () => {
    if (quesStep < questionsList.length) {
      setLocalState({ questionStep: quesStep + 1 });
      navigate(`${APP_PREFIX}/interviewQuiz?ques=${quesStep + 1}`);
    }
  };

  const handleSubmit = () => {
    submitAudio(audioFormData)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("feedback", res);
        toast.success(T.ANSWERS_SUBMITTED_SUCCESSFULLY);
        navigate(`${APP_PREFIX}/interviewResponse`, { state: res });
      })
      .catch(errorHandler);
  };

  return (
    <Grid container>
      <Grid item xs={isMd ? 2 : 3.25} />
      <Grid
        item
        xs={isMd ? 8 : 5.5}
        className="questionDiv"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minHeight: "270px",
          width: "inherit",
          minWidth: "300px",
          maxHeight: "650px",
          backgroundColor: "background.white",
          borderRadius: "8px",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "3px 3px 30px -10px rgba(0,0,0,0.3)",
          overflowY: "auto",
        }}
      >
        {quesStep < 5 ? (
          <Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography
                variant="subtitle-2"
                sx={{
                  flexWrap: "wrap",
                  textAlign: "start",
                  color: TEXT.grayBlue,
                  marginBottom: 1,
                }}
              >
                {`Question ${quesStep + 1}/5`}
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{
                flexWrap: "wrap",
                textAlign: "start",
                fontSize: isXs ? "1.3rem" : "1.6rem",
                lineHeight: isXs ? "1.3" : "1.6",
                fontWeight: "bold",
                mb: 1.5,
              }}
            >
              {/* {questionsList[questionStep]} */}
              {question?.question ? (
                question?.question
              ) : (
                <Skeleton variant="rectangular" width={400} height={30} />
              )}
            </Typography>
          </Stack>
        ) : (
          <Typography
            variant="h2"
            sx={{
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            Thank You!
          </Typography>
        )}
        <Box>
          {
            quesStep < 5 ? (
              <Box
                sx={{
                  display: isXs ? "block" : "flex",
                  justifyContent: "space-between",
                }}
              >
                {permission && recordingStatus === "inactive" ? (
                  <Button
                    variant="contained"
                    startIcon={
                      <MicIcon
                        sx={{
                          fontSize: "16px !important",
                          borderRadius: 50,
                          p: 0.2,
                          backgroundColor: "white",
                          color: NETSMARTZ_THEME_COLOR,
                        }}
                      />
                    }
                    sx={{
                      fontSize: 16,
                      px: 3,
                      width: isXs ? "100%" : 125,
                      minWidth: "90px",
                      py: 1.3,
                      mb: 2,
                      backgroundColor: "themeColor",
                      borderRadius: 2.1,
                      "&:hover": {
                        backgroundColor: "themeColor", // Change to your theme color
                      },
                    }}
                    disabled={answersList.length > +quesStep}
                    onClick={startRecording}
                  >
                    {T.ANSWER}
                  </Button>
                ) : null}

                {recordingStatus === "recording" ? (
                  <Button
                    variant="contained"
                    disabled={answersList.length < questionStep}
                    startIcon={
                      <StopCircleIcon
                        sx={{
                          fontSize: "16px !important",
                          borderRadius: 50,
                          p: 0.2,
                          backgroundColor: "white",
                          color: NETSMARTZ_THEME_COLOR,
                        }}
                      />
                    }
                    sx={{
                      fontSize: 16,
                      width: isXs ? "100%" : 125,
                      px: 4,
                      py: 1.3,
                      mb: 2,
                      backgroundColor: "themeColor",
                      borderRadius: 2.1,
                      "&:hover": {
                        backgroundColor: "themeColor", // Change to your theme color
                      },
                    }}
                    onClick={stopRecording}
                  >
                    Stop
                  </Button>
                ) : null}
                {console.log("answersList", answersList)}
                {answersList.length > +quesStep ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <audio
                      src={answersList[quesStep]}
                      controls
                      style={{ width: "220px", height: "40px" }}
                    />
                  </Box>
                ) : null}

                {quesStep < 4 ? (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                    disabled={answersList.length === questionStep}
                    sx={{
                      borderColor: "themeColor",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 2,
                      width: isXs ? "100%" : 100,
                      fontSize: "15px",
                      px: 1.4,
                      py: 1.3,
                      mb: 2,
                      "&:hover": {
                        borderColor: "themeColor", // Change to your theme color
                      },
                    }}
                  >
                    {T.NEXT}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    disabled={
                      answersList.length < 5 || audioData?.status == "pending"
                    }
                    sx={{
                      borderColor: "themeColor",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 2,
                      width: isXs ? "100%" : 100,
                      fontSize: "15px",
                      px: 1.4,
                      py: 1.3,
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "themeColor", // Change to your theme color
                        borderColor: NETSMARTZ_THEME_COLOR,
                        color: "white",
                      },
                    }}
                  >
                    {audioData?.status == "pending"
                      ? "Submitting..."
                      : T.SUBMIT}
                  </Button>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    padding: "8px 60px",
                    fontSize: 24,
                    backgroundColor: "themeColor",
                    "&:hover": {
                      backgroundColor: "themeColor", // Change to your theme color
                    },
                  }}
                >
                  {T.FINISH}
                </Button>
              </Box>
            )
          }
        </Box>
      </Grid>
      <Grid item xs={isMd ? 2 : 3.25} />
    </Grid>
  );
};

export default InterviewQuestions;
