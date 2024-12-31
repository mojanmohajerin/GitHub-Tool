import type { FC } from "react";

import { Button, SvgIcon } from "@mui/material";
import XClose from "@untitled-ui/icons-react/build/esm/XClose";

import { colors } from "../styles/colors";

interface XCloseButtonProps {
  handleClose: () => void;
}

export const XCloseButton: FC<XCloseButtonProps> = ({ handleClose }) => {
  return (
    <Button
      onClick={handleClose}
      sx={{
        color: colors.chalk,
        transform: "scale(1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "transparent",
          color: colors.lime,
          transform: "scale(1.2) rotate(90deg)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
      disableRipple
    >
      <SvgIcon>
        <XClose />
      </SvgIcon>
    </Button>
  );
};
