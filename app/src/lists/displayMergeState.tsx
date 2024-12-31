import type { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { ConflictIcon } from "../assets/githubIcons/conflictIcon";
import { WhiteCross } from "../assets/githubIcons/whiteCross";
import { WhiteTick } from "../assets/githubIcons/whiteTick";

interface DisplayMergeStateProps {
  mergeState: string;
}

export const DisplayMergeState: FC<DisplayMergeStateProps> = ({
  mergeState,
}) => {
  return (
    <Stack direction="row" sx={{ paddingLeft: 2, alignItems: "center" }}>
      <Typography sx={{ fontWeight: "bold" }}>Merge State:</Typography>
      <Stack direction="column" spacing={1} sx={{ paddingLeft: 2 }}>
        <Stack
          direction="row"
          spacing={0}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            paddingRight: 1,
            alignItems: "center",
          }}
        >
          {mergeState === "clean" ? (
            <>
              <WhiteTick />
              <Typography>No conflicts</Typography>
            </>
          ) : mergeState === "dirty" ? (
            <>
              <ConflictIcon />
              <Typography>Conflicting files</Typography>
            </>
          ) : mergeState === "blocked" ? (
            <>
              <WhiteCross />
              <Typography>Insufficient approving reviews</Typography>
            </>
          ) : mergeState === "unstable" ? (
            <>
              <ConflictIcon />
              <Typography>Potentially failing tests</Typography>
            </>
          ) : (
            <>
              <ConflictIcon />
              <Typography>Undetermined, please try again later</Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
