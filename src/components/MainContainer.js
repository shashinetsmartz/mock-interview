import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { get } from "lodash";

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

// import Header from "components/Header/index.js";

import { getPageTitle } from "utils/seo";
import "react-toastify/dist/ReactToastify.css";

import { TOAST_DISMISS_TIMEOUT } from "settings/constants/toast";
import Header from "./Header";
// import { useLazyGetSessionTokenQuery } from "api/getSessionToken";
// import { errorHandler } from "utils/errorHandler";
// import useSessionStorage from "utils/hooks/useSessionStorage";
// import { useDispatch } from "react-redux";
// import { startSession } from "slices/sessionSlice";
// import { clearCache } from "utils/clearCache";

const MainContainer = ({ children }) => {
  // const dispatch = useDispatch();
  // const { setItem } = useSessionStorage();
  const location = useLocation();
  const { pathname } = location;
  // const [getSessionToken] = useLazyGetSessionTokenQuery();
  // const handleSessionTokenSetting = () => {
  //   getSessionToken()
  //     .unwrap()
  //     .then((res) => {
  //       const token = get(res, "token", "");
  //       setItem("token", token);
  //       dispatch(startSession({ token: token }));
  //     })
  //     .catch(errorHandler);
  // };

  // useEffect(() => {
  //   clearCache();
  //   if (!sessionStorage.getItem("sessionToken")) {
  //     handleSessionTokenSetting();
  //   }
  // }, []);

  //   const { sessionToken } = currentUser();

  return (
    <>
      <Helmet>
        <title>{getPageTitle(pathname)}</title>
      </Helmet>

      {/* {sessionToken && <Header />} */}
      {<Header />}

      {children}

      <ToastContainer
        position="top-right"
        autoClose={TOAST_DISMISS_TIMEOUT}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        transition={Slide}
        theme="colored"
      />
      {/* {MISCurrentUser() && ( */}
      {
        // <Box
        //   position="fixed"
        //   bottom={0}
        //   p={1}
        //   right={0}
        //   left="auto"
        //   width="100%"
        //   bgcolor={BACKGROUND.white}
        //   textAlign="center"
        // >
        //   <Typography variant="subtitle2" color={NETSMARTZ_THEME_COLOR}>
        //     {T.FOOTER_TEXT}
        //   </Typography>
        // </Box>
      }
    </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
