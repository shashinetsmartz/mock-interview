import Typography from "@mui/material/Typography";
import { Container, styled } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useLocation } from "react-router-dom";

const HeaderTypography = styled(Typography)(() => ({
  fontWeight: "bold",
  opacity: 0.8,
}));

const SubHeaderTypography = styled(Typography)(() => ({
  fontWeight: "normal",
}));

const NetsmartzWarningAmberRoundedIcon = styled(WarningAmberRoundedIcon)(({ theme }) => ({
  color: theme.palette.themeColor,
  fontSize: "40px",
}));

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <Container
      sx={{
        textAlign: "center",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -45%)",
        opacity: 0.7,
      }}
    >
      <NetsmartzWarningAmberRoundedIcon />
      <HeaderTypography variant="h4">{"404 : Not Found"}</HeaderTypography>
      <SubHeaderTypography variant="ntz_subtitle">{`Path ...${pathname} Does Not Exist`}</SubHeaderTypography>
    </Container>
  );
};

export default NotFound;
