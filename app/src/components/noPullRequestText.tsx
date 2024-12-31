import type { FC } from "react";

import { Stack, Typography } from "@mui/material";

export const NoPullRequestText: FC = () => {
  return (
    <Stack sx={{ padding: 5 }}>
      <Typography>Click on a pull request to open. 🥺</Typography>
    </Stack>
  );
};
