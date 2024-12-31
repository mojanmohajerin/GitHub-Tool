import { Button } from "@mui/material";

import { colors } from "../../styles/colors";

export const DraftIcon = () => {
  return (
    <Button
      sx={{
        backgroundColor: colors.grey.dark,
        color: colors.white,
        height: "30px",
        width: "80px",
        borderRadius: "15px",
        padding: "5px 50px",
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "20px",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
      startIcon={
        <svg
          height="16"
          className="octicon octicon-git-pull-request-draft"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          aria-hidden="true"
        >
          <path
            d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 14a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM2.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM14 7.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-4.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
            fill={colors.chalk}
          ></path>
        </svg>
      }
    >
      Draft
    </Button>
  );
};
