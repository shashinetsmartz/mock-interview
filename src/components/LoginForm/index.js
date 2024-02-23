import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper, TextField, Button } from "@mui/material";

import { APP_PREFIX } from "router/routes";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import { usePostUserInfoMutation } from "api/postUserInfo";
import { errorHandler } from "utils/errorHandler";
import T from "T";

const LoginForm = () => {
  const [postUserInfo] = usePostUserInfoMutation();
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      empName: "",
      empCode: "",
    }
  );

  const [errors, setErrors] = useState({
    empNameErr: "",
    empCodeErr: "",
  });

  const { empName, empCode } = localState;
  const { empNameErr, empCodeErr } = errors;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });

    // Clear the error when user starts typing again
    setErrors({ ...errors, [`${name}Err`]: "" });
  };

  // const handleSubmit = () => {
  //   if (empName && empCode) {
  //     const payloadFormData = new FormData();
  //     payloadFormData.append("user_name", empName);
  //     payloadFormData.append("employee_code", empCode);
  //     postUserInfo(payloadFormData)
  //       .unwrap()
  //       .then(() => navigate(`${APP_PREFIX}/interviewQuiz`))
  //       .catch(errorHandler);
  //   }
  //   navigate(`${APP_PREFIX}/interviewQuiz`);
  // };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { empNameErr: "", empCodeErr: "" };

    if (!empName) {
      newErrors.empNameErr = "Employee name is required.";
      isValid = false;
    }

    if (!empCode) {
      newErrors.empCodeErr = "Employee code is required.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      navigate(`${APP_PREFIX}/interviewQuiz`);
      const payloadFormData = new FormData();
      payloadFormData.append("user_name", empName);
      payloadFormData.append("employee_code", empCode);
      postUserInfo(payloadFormData)
        .unwrap()
        .then(() => navigate(`${APP_PREFIX}/interviewQuiz`))
        .catch(errorHandler);
    }
    // navigate(`${APP_PREFIX}/interviewQuiz`);
  };
  return (
    <Paper elevation={2} sx={{ p: "50px 50px", width: "250px" }}>
      {/* {isFetching && <MISLoader />} */}
      <Typography
        variant="h5"
        textAlign="center"
        fontSize={22}
        fontWeight={"bold"}
      >
        {T.USER_DETAILS.toUpperCase()}
      </Typography>

      <Typography variant="body1" mt={4}>
        {T.USER_NAME}
      </Typography>

      <TextField
        placeholder={T.TYPE_YOUR_EMAIL_HERE}
        variant="outlined"
        name="empName"
        value={empName}
        sx={{
          mt: 0.5,
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={handleChange}
        error={Boolean(empNameErr)}
        helperText={empNameErr}
      />

      <Typography variant="body1" mt={3}>
        {T.EMP_ID}
      </Typography>
      <TextField
        placeholder={T.TYPE_YOUR_EMAIL_HERE}
        variant="outlined"
        name="empCode"
        value={empCode}
        // onKeyPress={handleKeyPress}
        sx={{
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={handleChange}
        error={Boolean(empCodeErr)}
        helperText={empCodeErr}
      />

      <Button
        variant="contained"
        sx={{
          bgcolor: NETSMARTZ_THEME_COLOR,
          mt: 3.5,
          mb: 2,
          width: "100%",
          "&:hover": {
            backgroundColor: "themeColor", // Change to your theme color
          },
        }}
        onClick={handleSubmit}
      >
        {T.START}
      </Button>
    </Paper>
  );
};

export default LoginForm;
