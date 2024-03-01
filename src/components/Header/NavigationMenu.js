import { Box, Typography } from "@mui/material";

import T from "T";
import NETSMARTZ_NAV_LOGO from "assets/Header.png";
import { GET_SIZE } from "utils/responsive";

const NavigationMenu = () => {
  const { isXs, isFoldableMobile } = GET_SIZE();
  
  return (
    <Box
      display={isXs?"block":"flex"}
      justifyContent="space-between"
      alignItems="center"
      position={"relative"}
      sx={isFoldableMobile ? { flexDirection: "column" } : {}}
    >
      <Box component="img" src={NETSMARTZ_NAV_LOGO} alt="Netsmartz Logo" pl={1.5} width={200} height={60} sx={{
          display: "block",  margin: isXs && "auto"
        }}/>
      <Box
        justifyContent="center"
        sx={
          isXs
            ? { display: "flex", color: "themeColor", width: "100%", justifyContent:"center" }
            : { display: "flex", color: "themeColor", position: "absolute", left: "31%" }
        }
        
      >
        <Typography variant="h5" sx={{fontSize: {xs:"20px", sm:"24px"}, px:{xs:2}, py:{xs:1}}} textAlign={"center"} fontWeight={600}>{T.MOCK_INTERVIEW_TOOL}</Typography>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
