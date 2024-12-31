import { Modal, Box, Backdrop, Typography, Fade, Stack } from "@mui/material";
import { useState } from "react";
import * as React from "react";

import { colors } from "../styles/colors";
import { CustomButton } from "./customButton";

export const CustomModal = () => {
  const messages = [
    "You’ve got this!",
    "Keep pushing forward, no matter how hard it gets.",
    "Believe in yourself, you’re stronger than you think.",
    "Every step you take brings you closer to your goal.",
    "Don’t give up – success is just around the corner.",
    "You’re capable of amazing things.",
    "Stay positive, work hard, and make it happen.",
    "Challenges are opportunities to grow.",
    "Your potential is limitless.",
    "You are enough just as you are.",
    "Take it one day at a time – you’re making progress.",
    "Difficult roads often lead to beautiful destinations.",
    "You’re doing better than you think you are.",
    "Keep your head up – better days are coming.",
    "Your hard work will pay off soon.",
    "Don’t stop now – you’re closer than you think.",
    "Believe in your journey, it’s unique and beautiful.",
    "You’re stronger than any obstacle in your way.",
    "You’re capable of overcoming anything.",
    "Great things take time – keep going!",
  ];

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const [message] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  const handleClose = () => {
    setOpenFilterDrawer(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFilterDrawer}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openFilterDrawer}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              backgroundColor: colors.dark,
              border: `1px solid ${colors.chalk}`,
              borderRadius: 3,
              boxShadow: 24,
              padding: 4,
              "&:hover": {
                border: `1px solid ${colors.lime}`,
              },
            }}
          >
            <Stack
              direction="column"
              spacing={3}
              sx={{
                alignItems: "flex-start",
              }}
            >
              <Typography id="transition-modal-title" variant="h4">
                Welcome to my playground!
              </Typography>
              <Stack direction="column" spacing={2}>
                <Typography id="transition-modal-description">
                  Instructions are in the README.md.
                </Typography>
                <Typography id="transition-modal-description">
                  {message}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <CustomButton text="Close" handleClick={handleClose} />
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
