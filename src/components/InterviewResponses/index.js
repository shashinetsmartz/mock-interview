import React from "react";
import {
  Typography,
  Divider,
  Grid,
  Card,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import T from "T";
import {
  ERROR,
  NETSMARTZ_THEME_COLOR,
  SUCCESS,
} from "theme/colors";
import { GET_SIZE } from "utils/responsive";
import { useLocation } from "react-router-dom";


const InterviewResponses = () => {
  const { isXs } = GET_SIZE();
  function convertToTitleCase(str) {
    return str.replace(/_/g, " ").replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  const location = useLocation()
console.log('location', location.state)
  const coloredCard = (item) => {
    return (
      <Box
        sx={{
          minHeight: "106px",
          minWidth: "170px",
        }}
      >
        <Card
          sx={{
            background: "background.white",
            height: "45%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "10px 10px 30px -10px rgba(0,0,0,0.2)",
            minHeight: "inherit",
            minWidth: "inherit",
            alignItems: "center",
            position: "relative",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              variant="h6"
              margin="auto"
              textAlign={"center"}
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {convertToTitleCase(item.title)}
            </Typography>
          </Stack>
          <Box width={"100%"}>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" , mt:0.8}}>
              {item.level < 3 ? (
                <Typography sx={{fontWeight: 'bold'}} color={ERROR.main}>Level {item.level}</Typography>
              ) : item.level == 3 ? (
                <Typography sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 'bold' }}>
                  Level {item.level}
                </Typography>
              ) : (
                <Typography sx={{fontWeight: 'bold'}} color={SUCCESS.main}>Level {item.level}</Typography>
              )}
              <Tooltip
                title={
                  <span style={{ width: "50px", fontSize: "13px" }}>
                    {item.desc}
                  </span>
                }
              >
                <InfoIcon
                  className="info_ic"
                  fontSize="medium"
                  sx={{ ml: 1, cursor: "pointer", color:"gray" }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  };

  return (
    <Box p="10px 20px">
      <Typography variant="h6" fontWeight={600} mb={1}>
        {T.DASHBOARD_VIEW}
      </Typography>
      <Grid container p={3} spacing={3} sx={{mt:isXs && "30px"}}>
        {location?.state?.map((item) => (
          <Grid item sm={6} lg={3} xs={12}>
            {coloredCard(item)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default InterviewResponses;
