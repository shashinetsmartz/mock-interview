import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import T from 'T';
import { TEXT } from 'theme/colors';


const InterviewQuestion = () => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audio, setAudio] = useState(null);
    const [permission, setPermission] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [localState, setLocalState] = useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }), {
        questionsList: ["Please Introduce Yourself?",
            "What all projects are associated so far?",
            "Describe a situation where you had to troubleshoot a complex technical issue. How did you approach it, and what was the outcome?",
            "What is your work style ?",
            "Describe a situation where you had to collaborate with cross-functional teams to achieve a common goal. What challenges did you face, and how did you overcome them?"],
        answersList: [],
        questionStep: 0,
    }
    )

    const { questionsList, answersList, questionStep } = localState;

    
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
                alert("Microphone access permission required !")
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    useEffect(() => {
        getMicrophonePermission()
    }, [])
    const startRecording = () => {
        setRecordingStatus("recording");
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            mediaRecorder.start();
            const chunks = [];
            mediaRecorder.ondataavailable = e => chunks.push(e.data);
            mediaRecorder.onstop = () => {
              const blob = new Blob(chunks, { type: 'audio/wav' });
              setAudioBlob(blob);
            };
            setAudioChunks(chunks);
          })
          .catch(error => {
            alert("Microphone access permission required !")
            console.error('Error accessing microphone:', error)});
      };
     
      const stopRecording = () => {
        setRecordingStatus("inactive");
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: 'audio/wav' });
            setAudioBlob(blob);
          };
          const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
        }
      };
     
      const handleUpload = () => {
        if (audioBlob) {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.wav');
     
          fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            body: formData
          })
          .then(response => {
            // Handle response from the server
          })
          .catch(error => console.error('Error uploading audio:', error));
        }
      };
 
    const handleNext = () => {
        if (questionStep < questionsList.length) {
            setLocalState({ questionStep: questionStep + 1 })
        }

    }
    // console.log(questionsList[questionStep], questionStep)
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} className='questionDiv' sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "300px",
                width: "inherit",
                backgroundColor: "background.white",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                {questionStep < questionsList.length ?
                    <Stack>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography
                                variant="subtitle-2"
                                sx={{
                                    flexWrap: "wrap",
                                    textAlign: "start",
                                    color:TEXT.grayBlue
                                }}
                            >
                                {`Question ${questionStep + 1}/${questionsList.length}`}
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                flexWrap: "wrap",
                                textAlign: "start",
                            }}
                        >
                            {questionsList[questionStep]}
                        </Typography>
                    </Stack>
                    :
                    <Typography
                        variant="h2"
                        sx={{
                            flexWrap: "wrap",
                            textAlign: "center",
                        }}
                    >
                        Thank You!
                    </Typography>
                }
                <Box>
                    <Divider sx={{ marginBottom: "10px" }} />
                    {
                        questionStep < questionsList.length ?
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                {/* {!permission ? (
                                    <button onClick={getMicrophonePermission} type="button">
                                        Get Microphone
                                    </button>
                                ) : null} */}
                                {permission && recordingStatus === "inactive" ?
                                    <Button variant="contained" startIcon={<MicIcon sx={{ fontSize: "30px !important" }} />} sx={{
                                        padding: "8px 60px", width: "225px", fontSize: 24, backgroundColor: "themeColor", '&:hover': {
                                            backgroundColor: "themeColor" // Change to your theme color
                                        }
                                    }}
                                        onClick={startRecording}
                                    >
                                        {T.ANSWER}
                                    </Button> : null
                                }

                                {recordingStatus === "recording" ? (
                                    <Button variant="contained" startIcon={<StopCircleIcon sx={{ fontSize: "30px !important" }} />} sx={{
                                        padding: "8px 60px", width: "225px", fontSize: 24, backgroundColor: "themeColor", '&:hover': {
                                            backgroundColor: "themeColor" // Change to your theme color
                                        }
                                    }}
                                        onClick={stopRecording}
                                    >
                                        Stop
                                    </Button>
                                ) : null}
                                {audio ? (
                                    <Box className="audio-container" >
                                        <audio src={audio} controls />
                                        {/* <a download href={audio}>
                                            Download Recording
                                        </a> */}
                                    </Box>
                                ) : null}

                                <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon sx={{ fontSize: "35px !important" }} />} sx={{
                                    padding: "8px", "& .css-1gnd1fd-MuiButton-endIcon": {
                                        margin: "0px"
                                    }, backgroundColor: "themeColor",
                                    '&:hover': {
                                        backgroundColor: "themeColor" // Change to your theme color
                                    }

                                }} />
                            </Box>
                            :
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" sx={{
                                    padding: "8px 60px", fontSize: 24, backgroundColor: "themeColor", '&:hover': {
                                        backgroundColor: "themeColor" // Change to your theme color
                                    }
                                }}>
                                    {T.FINISH}
                                </Button>
                            </Box>
                    }
                </Box>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
};

export default InterviewQuestion;








