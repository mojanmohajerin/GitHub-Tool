import { Box } from "@mui/material";

import { colors } from "../../styles/colors";

export const WhiteTick = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.green,
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
        className="octicon octicon-check"
      >
        <path
          d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
          fill={colors.chalk}
        ></path>
      </svg>
    </Box>
  );
};
