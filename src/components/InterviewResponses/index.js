// import { Box, Grid, Typography, styled } from '@mui/material';
// import T from 'T';
// import React from 'react';
// import { MOCK_RESPONSES } from 'utils/mockData';
// export const MainTitleTypography = styled(Typography)(() => ({
//     fontWeight: 700,
//     fontSize: 14,
//     lineHeight: "22px",
//     whiteSpace: "nowrap",
// }));

// export const SubTitleTypography = styled(Typography)(() => ({
//     fontWeight: 600,
//     fontSize: 14,
//     lineHeight: "22px",
//     whiteSpace: "nowrap",
// }));

// function convertToTitleCase(str) { return str.replace(/_/g, ' ').replace(/\b\w/g, function (char) { return char.toUpperCase(); }); }
// const InterviewResponses = () => {
//     return (
//         <>
//             <Grid container>
//                 <Grid item xs={3} />
//                 <Grid item xs={6}>
//                     {
//                         Object.keys(MOCK_RESPONSES).map(key => {
//                             return (
//                                 <Box display={"inline-flex"}>
//                                     <MainTitleTypography variant="h6" sx={{
//                                         textAlign: "center",
//                                     }}>
//                                         {`${convertToTitleCase(key)} : `}
//                                     </MainTitleTypography>
//                                     <SubTitleTypography>
//                                         {MOCK_RESPONSES[key]}
//                                     </SubTitleTypography>

//                                 </Box>
//                             )
//                         })
//                     }

//                 </Grid>
//                 <Grid item xs={3} />

//             </Grid>
//         </>
//     );
// };

// export default InterviewResponses;

import React, { useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  Card,
  styled,
  Box,
  Stack,
  Tooltip,
  Button,
} from "@mui/material";
import { get } from "lodash";

import InfoIcon from "@mui/icons-material/Info";

import T from "T";
import {
  BACKGROUND,
  ERROR,
  NETSMARTZ_THEME_COLOR,
  SUCCESS,
  TEXT,
} from "theme/colors";
import { MOCK_RESPONSES } from "utils/mockData";
import { GET_SIZE } from "utils/responsive";
// import ExpiringProjects from "assets/DashboardAssets/ExpiringProjects.png";
// import MembersRamped from "assets/DashboardAssets/MembersRamped.png";
// import NewProjects from "assets/DashboardAssets/NewProjects.png";
// import OnBench from "assets/DashboardAssets/OnBench.png";
// import MembersJoining from "assets/DashboardAssets/MembersJoining.png";
// import MembersGettingRelieved from "assets/DashboardAssets/MembersGettingRelieved.png";
// import PendingTaskButton from "assets/DashboardAssets/PendingTaskButton.png";
// import { useLazyGetDashboardCountViewQuery } from "api/Dashboard/dashboardCountView";
// import { Stack } from "@mui/system";

const StyledTypography = styled(Typography)(() => ({
  fontSize: 13,
  margin: "3px auto",
  wordWrap: "break-word",
  textAlign: "center",
  maxWidth: 175,
}));

const InterviewResponses = () => {
  //   const [getDashboardCountView,{data:dashboardCount}] = useLazyGetDashboardCountViewQuery();
  //   const records= get(dashboardCount,"results","");
  //   useEffect(()=>{
  //       getDashboardCountView()
  //   },[])
  const { isXs } = GET_SIZE();
  function convertToTitleCase(str) {
    return str.replace(/_/g, " ").replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

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
            // opacity:0.8,
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
            {/* color={BACKGROUND.white} */}
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
        {MOCK_RESPONSES.map((item) => (
          <Grid item sm={6} lg={3} xs={12}>
            {coloredCard(item)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default InterviewResponses;
