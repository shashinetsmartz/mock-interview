import Typography from "@mui/material/Typography";
import { Container, styled } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

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

const NoAuth = () => {
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
      <HeaderTypography variant="h4">{" 401 : UnAuthorized"}</HeaderTypography>
      <SubHeaderTypography variant="ntz_subtitle">{"You are not authorised to access this page"}</SubHeaderTypography>
    </Container>
  );
};

export default NoAuth;
