import React, { useReducer } from 'react';
import T from 'T';
import { Box, Button, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import MockTextField from 'components/common/MockTextField';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX } from 'router/routes';
import { usePostUserInfoMutation } from 'api/postUserInfo';
import { errorHandler } from 'utils/errorHandler';

const Home = () => {
    const [postUserInfo] = usePostUserInfoMutation();
    const [localState, setLocalState] = useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }), {
        empName: "",
        empCode: "",
    }
    )

    const { empName, empCode } = localState;

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalState({ [name]: value })
    }

    const handleSubmit = () => {
        // if(empName && empCode)
        // {
        //     const payloadFormData= new FormData();
        //     payloadFormData.append("user_name",empName)
        //     payloadFormData.append("employee_code",empCode)
        //     postUserInfo(payloadFormData)
        //     .unwrap()
        //     .then(() => navigate(`${APP_PREFIX}/interviewQuiz`))
        //     .catch(errorHandler)
        // }
        navigate(`${APP_PREFIX}/interviewQuiz`)

    }

    return (
        <Grid container sx={{ marginTop: "100px" }}>
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Paper
                    // bgcolor={"#fff"}
                    padding={4}
                    elevation={3}
                    // display="flex"
                    flexDirection="column"
                    // justifyContent="center"
                    // alignItems="center"
                    height="calc(100vh - 360px)"
                >
                    <Grid container display={"flex"} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <Typography variant='h5' mb={4}>
                                {`${T.PLEASE_ENTER_YOUR_NAME} ${T.AND_SIGN} ${T.PRESS_START}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MockTextField
                                value={empName}
                                name="empName"
                                // label={T.PLEASE_ENTER_YOUR_NAME}
                                // fullWidth
                                // multiline
                                size="medium"
                                sx={{
                                    backgroundColor: "background.white",
                                    "& .MuiOutlinedInput-input": {
                                        fontSize: 22,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        boxShadow: 3, // Adjust values as needed
                                        borderRadius: "8px",
                                        paddingRight: "0px",
                                    },
                                    width: "500px"
                                }}
                                placeholder={`${T.ENTER_YOUR_NAME_HERE}...`}
                                onChange={handleChange}
                            // onKeyDown={(e) => {
                            //     if (e.key !== "Enter" || e.shiftKey || !empName) {
                            //         return;
                            //     }
                            //     e.preventDefault();
                            //     handleSubmit(e);
                            // }}
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment position="end">
                            //             {
                            //                 <IconButton onClick={handleSubmit} disabled={!empName} sx={{ color: "themeColor", mr: 1 }}>
                            //                     <SendIcon fontSize="large" name="sendIcon" data-val={empName} />
                            //                 </IconButton>
                            //             }
                            //         </InputAdornment>
                            //     ),
                            // }}
                            />

                        </Grid>
                        <Grid item xs={12}>

                            <MockTextField
                                value={empCode}
                                name="empCode"
                                // label={T.PLEASE_ENTER_YOUR_NAME}
                                // fullWidth
                                // multiline
                                size="medium"
                                sx={{
                                    mt: 4,
                                    backgroundColor: "background.white",
                                    "& .MuiOutlinedInput-input": {
                                        fontSize: 22,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        boxShadow: 3, // Adjust values as needed
                                        borderRadius: "8px",
                                        paddingRight: "0px",
                                    },
                                    width: "500px"
                                }}
                                placeholder={`${T.ENTER_YOUR_EMP_CODE_HERE}...`}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleSubmit} sx={{
                                mt: 4,
                                padding: "8px", "& .css-1gnd1fd-MuiButton-endIcon": {
                                    margin: "0px"
                                }, backgroundColor: "themeColor",
                                '&:hover': {
                                    backgroundColor: "themeColor" // Change to your theme color
                                },

                                width: "500px"
                            }}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter" || e.shiftKey || !empName || !empCode) {
                                        return;
                                    }
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >{T.START}</Button>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
};

export default Home;