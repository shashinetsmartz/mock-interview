import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import routes, { APP_PREFIX } from "router/routes";

// import { useLoginMutation } from "api/login";

// import { isEmail } from "utils/validations";
// import { handleError } from "utils/error";

import { SUCCESS, ERROR, NETSMARTZ_THEME_COLOR } from "theme/colors";

import { usePostUserInfoMutation } from "api/postUserInfo";

import { errorHandler } from "utils/errorHandler";

import T from "T";

// import { get } from "utils/lodash";
// import { toast } from "react-toastify";
// import { loginStore } from "slices/loginSlice";
// import MISLoader from "components/common/MISLoader";
// import { memberFilterStore } from "slices/memberFilterSlice";
// import { memberSearchStore } from "slices/memberSearchSlice";
// import { savedFilterStore } from "slices/savedFilterSlice";

const LoginForm = () => {
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
    <Paper elevation={2} sx={{ p: "32px 50px", width: "250px" }}>
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
        // onKeyPress={handleKeyPress}
        sx={{
          // mb: !isEmail(username) ? 0 : 2,
          mt: 0.5,
          // "& .MuiOutlinedInput-notchedOutline": {
          //   borderBottom:
          //     username &&
          //     `3px solid ${isEmail(username) ? SUCCESS.main : ERROR.main}`,
          // },
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={handleChange}
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
      />

      <Button
        variant="contained"
        sx={{
          bgcolor: NETSMARTZ_THEME_COLOR,
          mt: 3.5,
          mb: 3,
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
