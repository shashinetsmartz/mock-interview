import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";


import { getPageTitle } from "utils/seo";
import "react-toastify/dist/ReactToastify.css";

import { TOAST_DISMISS_TIMEOUT } from "settings/constants/toast";
import Header from "./Header";

const MainContainer = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Helmet>
        <title>{getPageTitle(pathname)}</title>
      </Helmet>

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
    </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
