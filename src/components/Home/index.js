import React, { useEffect } from "react";

import { Grid, Box } from "@mui/material";

import NetsmartzLogo from "assets/NetsmartzLogo.png";
import LoginForm from "components/LoginForm";
import { clearCache } from "utils/clearCache";
import { GET_SIZE } from "utils/responsive";

const Login = () => {
  useEffect(() => {
    clearCache();
  }, []);

  const { isXs } = GET_SIZE();

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
          height="70px"
          width="170px"
          src={NetsmartzLogo}
          margin={isXs?"80px auto 20px auto":"20px auto"}
        />
      </Grid>
      <Grid item xs={1.5} />
      <Grid item xs={4.5} />
      <Grid
        item
        xs={3}
        justifyContent={"center"}
        display={ "grid"}
        minWidth={isXs ? "100%" : "auto"}
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
