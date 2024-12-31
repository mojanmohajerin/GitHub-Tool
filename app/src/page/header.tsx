import type { Dispatch, FC, SetStateAction } from "react";

import { keyframes } from "@emotion/react";
import { Box, Stack } from "@mui/material";

import "../App.css";
import skLogo from "../assets/squarekicker-logo.svg";
import { CustomButton } from "../customComponents/customButton";

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

interface HeaderProps {
  setOpenFilterDrawer: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({ setOpenFilterDrawer }) => {
  return (
    <header className="App-header">
      <Stack direction="row" sx={{ width: "100%", paddingX: 5 }}>
        <Stack
          direction="row"
          spacing={{ xs: 0, lg: 2 }}
          sx={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            alt="SquareKicker Logo"
            src={skLogo as unknown as string}
            sx={{
              height: "7vmin",
              padding: 1,
              animation: `${rotate}  infinite 20s linear`,
            }}
          />
          <p className="title">
            GitHub Playground <code className="beta">(beta)</code>
          </p>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            text="Filter"
            handleClick={() => setOpenFilterDrawer(true)}
          />
        </Stack>
      </Stack>
    </header>
  );
};
