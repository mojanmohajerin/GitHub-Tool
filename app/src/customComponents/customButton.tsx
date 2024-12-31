import type { FC } from "react";

import { Button, Typography } from "@mui/material";

import { colors } from "../styles/colors";

interface CustomButtonProps {
  text: string;
  handleClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ text, handleClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "100px",
        height: "fit-content",
        backgroundColor: colors.charcoal,
        color: colors.chalk,
        border: `1px solid ${colors.chalk}`,
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: colors.charcoal,
          color: colors.lime,
          border: `1px solid ${colors.lime}`,
        },
      }}
      onClick={handleClick}
    >
      <Typography noWrap sx={{ fontSize: "16px" }}>
        {text}
      </Typography>
    </Button>
  );
};
