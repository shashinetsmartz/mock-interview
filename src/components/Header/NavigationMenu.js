// import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import T from "T";
import NETSMARTZ_NAV_LOGO from "assets/Header.png";
import { useLocation } from "react-router-dom";
import { GET_SIZE } from "utils/responsive";

const NavigationMenu = () => {
  const { isXs, isFoldableMobile } = GET_SIZE();
  const location = useLocation();
  const { pathname }= location;
  // const location = useLocation();
  // const { pathname } = location;

  // const getCurrentActiveTab = (childList) => {
  //   if (!childList) return;
  //   if (pathname.includes("edit")) {
  //     const editPath = pathname.split("/");
  //     editPath.pop();
  //     const remainedPath = editPath.join("/");

  //     return childList
  //       .map((data) => data.includes(remainedPath))
  //       .includes(true);
  //   }

  //   return childList.includes(pathname);
  // };
  // const {user}= MISCurrentUser();
  // const userName =get(user,"username","")

  // const menuItems = getAllMenuItems();

  // const activeIndex = menuItems.findIndex(
  //   ({ childList }) => childList && childList.includes(pathname)
  // );

  return (
    <Box
      display={isXs?"block":"flex"}
      justifyContent="space-between"
      alignItems="center"
      position={"relative"}
      sx={isFoldableMobile ? { flexDirection: "column" } : {}}
    >
      {
        pathname.includes("home")?
        <Box  pl={1.5} width={200} height={60} sx={{
          display: "block",  margin: isXs && "auto"
        }}/>
        :
        <Box component="img" src={NETSMARTZ_NAV_LOGO} alt="Netsmartz Logo" pl={1.5} width={200} height={60} sx={{
            display: "block",  margin: isXs && "auto"
          }}/>

      }
      <Box
        justifyContent="center"
        sx={
          isXs
            ? { display: "flex", color: "themeColor", width: "100%", justifyContent:"center" }
            : { display: "flex", color: "themeColor", position: "absolute", left: "31%" }
        }
        // sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <Typography variant="h5" sx={{fontSize: {xs:"20px", sm:"24px"}, px:{xs:2}, py:{xs:1}}} textAlign={"center"} fontWeight={600}>{T.MOCK_INTERVIEW_TOOL}</Typography>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
