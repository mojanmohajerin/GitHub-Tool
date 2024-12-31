"use client";

import { Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";

import { colors } from "styles/colors";
import { Body } from "./page/body";
import { Footer } from "./page/footer";
import { Header } from "./page/header";
import { theme } from "./styles/createComponents";

export default function App() {
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          color: colors.charcoal,
          backgroundColor: colors.body,
        }}
      >
        <Header setOpenFilterDrawer={setOpenFilterDrawer} />
        <Body
          openFilterDrawer={openFilterDrawer}
          setOpenFilterDrawer={setOpenFilterDrawer}
        />
        <Footer />
      </Stack>
    </ThemeProvider>
  );
}
