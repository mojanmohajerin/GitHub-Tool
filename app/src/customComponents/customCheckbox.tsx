import type { FC } from "react";

import { Checkbox, SvgIcon } from "@mui/material";
import CheckCircle from "@untitled-ui/icons-react/build/esm/CheckCircle";

import { colors } from "../styles/colors";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: any;
  height?: number;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  height,
  ...props
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      icon={
        <SvgIcon
          sx={{
            transform: `scale(1)`,
            transition: `transform 0.2s ease-in-out`,
            opacity: 0.5,
            height: height,
          }}
        >
          <CheckCircle />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon
          sx={{
            color: colors.lime,
            transform: `scale(1.2) rotate(360deg)`,
            transition: `transform 0.2s ease-in-out`,
            height: height,
          }}
        >
          <CheckCircle />
        </SvgIcon>
      }
      TouchRippleProps={{
        style: {
          color: colors.lime,
        },
      }}
      {...props}
    />
  );
};
