// import React, { useReducer } from 'react';
// import T from 'T';
// import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material';
// import SendIcon from "@mui/icons-material/Send";
// import MockTextField from 'components/common/MockTextField';
// import { useNavigate } from 'react-router-dom';
// import { APP_PREFIX } from 'router/routes';
// import { usePostUserInfoMutation } from 'api/postUserInfo';
// import { errorHandler } from 'utils/errorHandler';

// const Home = () => {
//     const [postUserInfo]= usePostUserInfoMutation();
//     const [localState, setLocalState] = useReducer(
//         (prevState, newState) => ({ ...prevState, ...newState }), {
//         empName: "",
//         empCode: "",
//     }
//     )

//     const { empName, empCode } = localState;

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLocalState({ [name]: value })
//     }

//     const handleSubmit = () => {
//         // if(empName && empCode)
//         // {
//         //     const payloadFormData= new FormData();
//         //     payloadFormData.append("user_name",empName)
//         //     payloadFormData.append("employee_code",empCode)
//         //     postUserInfo(payloadFormData)
//         //     .unwrap()
//         //     .then(() => navigate(`${APP_PREFIX}/interviewQuiz`))
//         //     .catch(errorHandler)
//         // }
//         navigate(`${APP_PREFIX}/interviewQuiz`)

//     }

//     console.log(empName, empCode)
//     return (
//         <Box
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             height="calc(100vh - 360px)"
//         >
//             <Typography variant='h5' mb={4}>
//                 {`${T.PLEASE_ENTER_YOUR_NAME} ${T.AND_SIGN} ${T.PRESS_START}`}
//             </Typography>
//             <MockTextField
//                 value={empName}
//                 name="empName"
//                 // label={T.PLEASE_ENTER_YOUR_NAME}
//                 // fullWidth
//                 // multiline
//                 size="medium"
//                 sx={{
//                     backgroundColor: "background.white",
//                     "& .MuiOutlinedInput-input": {
//                         fontSize: 22,
//                     },
//                     "& .MuiOutlinedInput-root": {
//                         boxShadow: 3, // Adjust values as needed
//                         borderRadius: "8px",
//                         paddingRight: "0px",
//                     },
//                     width: "500px"
//                 }}
//                 placeholder={`${T.ENTER_YOUR_NAME_HERE}...`}
//                 onChange={handleChange}
//                 // onKeyDown={(e) => {
//                 //     if (e.key !== "Enter" || e.shiftKey || !empName) {
//                 //         return;
//                 //     }
//                 //     e.preventDefault();
//                 //     handleSubmit(e);
//                 // }}
//                 // InputProps={{
//                 //     endAdornment: (
//                 //         <InputAdornment position="end">
//                 //             {
//                 //                 <IconButton onClick={handleSubmit} disabled={!empName} sx={{ color: "themeColor", mr: 1 }}>
//                 //                     <SendIcon fontSize="large" name="sendIcon" data-val={empName} />
//                 //                 </IconButton>
//                 //             }
//                 //         </InputAdornment>
//                 //     ),
//                 // }}
//             />
//             <MockTextField
//                 value={empCode}
//                 name="empCode"
//                 // label={T.PLEASE_ENTER_YOUR_NAME}
//                 // fullWidth
//                 // multiline
//                 size="medium"
//                 sx={{
//                     mt:4,
//                     backgroundColor: "background.white",
//                     "& .MuiOutlinedInput-input": {
//                         fontSize: 22,
//                     },
//                     "& .MuiOutlinedInput-root": {
//                         boxShadow: 3, // Adjust values as needed
//                         borderRadius: "8px",
//                         paddingRight: "0px",
//                     },
//                     width: "500px"
//                 }}
//                 placeholder={`${T.ENTER_YOUR_EMP_CODE_HERE}...`}
//                 onChange={handleChange}
//             />
//             <Button variant="contained" onClick={handleSubmit}  sx={{
//                 mt:4,
//                 padding: "8px", "& .css-1gnd1fd-MuiButton-endIcon": {
//                     margin: "0px"
//                 }, backgroundColor: "themeColor",
//                 '&:hover': {
//                     backgroundColor: "themeColor" // Change to your theme color
//                 },

//                 width: "500px"
//             }}
//             onKeyDown={(e) => {
//                 if (e.key !== "Enter" || e.shiftKey || !empName || !empCode) {
//                     return;
//                 }
//                 e.preventDefault();
//                 handleSubmit(e);
//             }}
//             >{T.START}</Button>
//         </Box>
//     );
// };

// export default Home;

import React, { useReducer, useEffect } from "react";

import { Grid, Box, Typography } from "@mui/material";

import NetsmartzLogo from "assets/NetsmartzLogo.png";
import LoginForm from "components/LoginForm";
import { clearCache } from "utils/clearCache";
import T from "T";
import { GET_SIZE } from "utils/responsive";
import { usePostUserInfoMutation } from "api/postUserInfo";

import { useNavigate } from "react-router-dom";
import { APP_PREFIX } from "router/routes";
import { errorHandler } from "utils/errorHandler";

const Login = () => {
  useEffect(() => {
    clearCache();
  }, []);

  const { isXs } = GET_SIZE();

  const [postUserInfo] = usePostUserInfoMutation();
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      empName: "",
      empCode: "",
    }
  );

  const { empName, empCode } = localState;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  const handleSubmit = () => {
    if (empName && empCode) {
      const payloadFormData = new FormData();
      payloadFormData.append("user_name", empName);
      payloadFormData.append("employee_code", empCode);
      postUserInfo(payloadFormData)
        .unwrap()
        .then(() => navigate(`${APP_PREFIX}/interviewQuiz`))
        .catch(errorHandler);
    }
    navigate(`${APP_PREFIX}/interviewQuiz`);
  };
  return (
    <Grid container p="6px 32px">
      <Grid item xs={1.5} />
      <Grid
        item
        xs={9}
        display={isXs ? "block" : "grid"}
        minWidth={isXs ? "100%" : "auto"}
        textAlign="center"
        sx={{
          ".carousel .slide img": {
            maxWidth: "36%",
          },
        }}
      >
        <Box
          component="img"
          src={NetsmartzLogo}
          margin="20px auto"
          maxWidth={isXs ?"40%": "15%"}
        />
      </Grid>
      <Grid item xs={1.5} />
      <Grid item xs={4.5} />
      <Grid
        item
        // xs={12}
        // sm={9}
        xs={3}
        justifyContent={"center"}
        display={ "grid"}
        minWidth={isXs ? "100%" : "auto"}
        // textAlign="center"
        sx={{
          ".carousel .slide img": {
            maxWidth: "36%",

          },
        }}
      >
        <LoginForm />
      </Grid>
      <Grid item xs={4.5} />
    </Grid>
  );
};

export default Login;
