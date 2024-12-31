import { createTheme } from "@mui/material";

import { colors } from "./colors";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.chalk,
          textTransform: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: colors.chalk,
          opacity: 0.3,
          width: "90%",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.chalk,
        },
      },
    },
  },
});
