import { Box } from "@mui/material";

import { colors } from "../../styles/colors";

export const WhiteCross = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.red,
        borderRadius: "50%",
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        data-view-component="true"
        className="octicon octicon-x"
      >
        <path
          d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
          fill={colors.chalk}
        ></path>
      </svg>
    </Box>
  );
};
