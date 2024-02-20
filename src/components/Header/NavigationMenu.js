// import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import T from "T";
import NETSMARTZ_NAV_LOGO from "assets/Header.png";
import { GET_SIZE } from "utils/responsive";

const NavigationMenu = () => {
  const { isXs, isFoldableMobile } = GET_SIZE();
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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position={"relative"}
      sx={isFoldableMobile ? { flexDirection: "column" } : {}}
    >
      <Box component="img" src={NETSMARTZ_NAV_LOGO} alt="Netsmartz Logo" pl={1.5} width={200} height={60} />
      <Box
        justifyContent="center"
        sx={
          isXs
            ? { display: "flex", color: "themeColor", width: "100%" }
            : { display: "flex", color: "themeColor", position: "absolute", left: "31%" }
        }
        // sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <Typography variant="h5" fontWeight={600}>{T.MOCK_INTERVIEW_TOOL}</Typography>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
