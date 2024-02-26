import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import T from "T";
import { NETSMARTZ_THEME_COLOR, TEXT } from "theme/colors";
import { useLazyGetQuestionQuery } from "api/getQuestion";
import { usePostAudioMutation } from "api/postAudios";
import { errorHandler } from "utils/errorHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX } from "router/routes";
import { GET_SIZE } from "utils/responsive";

const InterviewQuestions = () => {
  const { isXs, isLg, isMd } = GET_SIZE();
  const [getQuestion] = useLazyGetQuestionQuery();
  const [postAudio] = usePostAudioMutation();
  const navigate = useNavigate();
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      // questionsList: [],
      questionsList: [
        "Please Introduce Yourself",
        "What all projects are associated so far?",
        "Describe a situation where you had to troubleshoot a complex technical issue. How did you approach it, and what was the outcome?",
        "What is your work style ?",
        "Describe a situation where you had to collaborate with cross-functional teams to achieve a common goal. What challenges did you face, and how did you overcome them?",
      ],
      answersList: [],
      questionStep: 0,
    }
  );

  const { questionsList, answersList, questionStep } = localState;
  useEffect(() => {
    getQuestion(questionStep)
      .unwrap()
      .then((res) => {
        const questions = [...questionsList];
        questions.push(res?.question);
        setLocalState({ questionsList: questions });
      })
      .catch(errorHandler);
  }, [questionStep]);
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

  // const blobToBase64 = (blob) => {
  //     return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //             const base64String = reader.result.split(",")[1];
  //             resolve(base64String);
  //         };
  //         reader.onerror = (error) => {
  //             reject(error);
  //         };
  //         reader.readAsDataURL(blob);
  //     });
  // };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      let data = new FormData();

      // data.append(`audio_${questionStep}`, audioBlob, "recording.wav");

      // blobToBase64(audioBlob)
      //     .then((base64String) => {
      //         console.log('base64String', base64String); // Base64 string of the audio blob
      //     })
      //     .catch((error) => {
      //         console.error("Error converting blob to base64:", error);
      //     });

      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };
  const handleNext = () => {
    if (questionStep < questionsList.length) {
      setLocalState({ questionStep: questionStep + 1 });
    }
  };

  const handleSubmit = () => {
    navigate(`${APP_PREFIX}/interviewResponse`);
    // postAudio()
    //     .unwrap()
    //     .then(res => toast.success(T.ANSWERS_SUBMITTED_SUCCESSFULLY))
    //     .catch(errorHandler)
  };
  return (
    <Grid container>
      <Grid item xs={isMd?2:3.25} />
      <Grid
        item
        xs={isMd?8:5.5}
        className="questionDiv"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minHeight: "270px",
          width: "inherit",
          minWidth:"300px",
          maxHeight:"650px",
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
        {/* {questionStep < questionsList.length ? */}
        {questionStep < 5 ? (
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
                {/* {`Question ${questionStep + 1}/${questionsList.length}`} */}
                {`Question ${questionStep + 1}/5`}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                flexWrap: "wrap",
                textAlign: "start",
                // maxWidth: "40%",
                fontSize: isXs?"1.3rem":"1.6rem",
                lineHeight: isXs?"1.3":"1.6",
                fontWeight: "bold",
                mb: 1.5,
              }}
            >
              {questionsList[questionStep]}
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
            // questionStep < questionsList.length ?
            questionStep < 5 ? (
              <Box sx={{ display: isXs?"block":"flex", justifyContent: "space-between" }}>
                {/* {!permission ? (
                                    <button onClick={getMicrophonePermission} type="button">
                                        Get Microphone
                                    </button>
                                ) : null} */}
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
                      width:isXs ? "100%": 125,
                      minWidth:"90px",
                      py: 1.3,
                      mb:2,
                      backgroundColor: "themeColor",
                      borderRadius: 2.1,
                      "&:hover": {
                        backgroundColor: "themeColor", // Change to your theme color
                      },
                    }}
                    onClick={startRecording}
                  >
                    {T.ANSWER}
                  </Button>
                ) : null}

                {recordingStatus === "recording" ? (
                  <Button
                    variant="contained"
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
                      width:isXs ? "100%": 125,
                      px: 4,
                      py: 1.3,
                      mb:2,
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
                {audio ? (
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom:2 }}>
                    <audio
                      src={audio}
                      controls
                      style={{ width: "220px", height: "40px" }}
                    />
                    {/* <a download href={audio}>
                                            Download Recording
                                        </a> */}
                  </Box>
                ) : null}

                {questionStep < 4 ? (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderColor: "themeColor",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 2,
                      width: isXs?"100%":100,
                      fontSize: "15px",
                      px: 1.4,
                      py: 1.3,
                      mb:2,
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
                    sx={{
                      borderColor: "themeColor",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 2,
                      width: isXs?"100%":100,
                      fontSize: "15px",
                      px: 1.4,
                      py: 1.3,
                      mb:2,
                      "&:hover": {
                        backgroundColor: "themeColor", // Change to your theme color
                        borderColor: NETSMARTZ_THEME_COLOR,
                        color: "white",
                      },
                    }}
                  >
                    {T.SUBMIT}
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
      <Grid item xs={isMd?2:3.25} />
    </Grid>
  );
};

export default InterviewQuestions;
