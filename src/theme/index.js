import { createTheme } from "@mui/material/styles";

import { BACKGROUND, SUCCESS, ERROR, TEXT, NETSMARTZ_THEME_COLOR, BORDER } from "./colors";

const MockInterviewTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      watch: 180,
      foldable_mobile: 300,
      mobile: 450,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  typography: {
    ntz_body: {
      fontSize: 18,
      fontWeight: 400,
      color: TEXT.secondary,
    },
    ntz_subtitle: {
      fontSize: 14,
      color: TEXT.secondary,
    },
    ntz_heading: {
      fontWeight: 700,
      fontSize: 24,
    },
    fontFamily: `Inter, sans serif`,
    fontStyle: "normal",
    fontWeight: 400,
    color: TEXT.primary,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "Capitalize",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          svg: {
            fill: NETSMARTZ_THEME_COLOR,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: "1px solid #D4D4D4",
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: BACKGROUND.white,
          backgroundColor: NETSMARTZ_THEME_COLOR,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: BACKGROUND.yellow,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: BACKGROUND.white,
            color: NETSMARTZ_THEME_COLOR,
            borderRadius: "4px",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND.cardDefault,
          padding: "5px",
          borderRadius: "4px",
        },
      },
    },
  },
  palette: {
    background: BACKGROUND,
    success: SUCCESS,
    error: ERROR,
    text: TEXT,
    themeColor: NETSMARTZ_THEME_COLOR,
    border: BORDER,
  },
});

export default MockInterviewTheme;
