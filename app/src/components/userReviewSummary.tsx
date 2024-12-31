import type { FC } from "react";
import type { UsersSummaryType } from "types/types";

import { Box, Fade, Stack, SvgIcon, Typography } from "@mui/material";

import AnimatedIcon from "../assets/githubIcons/animatedIcon";
import { ReactComponent as GreenTick } from "../assets/githubIcons/greenTick.svg";
import { ReactComponent as OrangeDot } from "../assets/githubIcons/orange-dot.svg";
import { ReactComponent as RequestedChanges } from "../assets/githubIcons/requestedChanges.svg";
import { colors } from "../styles/colors";

interface UserReviewSummaryProps {
  hoverOverUser: string;
  usersSummary: UsersSummaryType | null;
  avatarUrl: string | undefined;
}

export const UserReviewSummary: FC<UserReviewSummaryProps> = ({
  hoverOverUser,
  usersSummary,
  avatarUrl,
}) => {
  return (
    <Fade in={hoverOverUser !== ""}>
      <Box
        sx={{
          width: 500,
          backgroundColor: colors.dark,
          border: `1px solid ${colors.chalk}`,
          borderRadius: 3,
          boxShadow: 24,
          paddingX: 5,
          paddingY: 3,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <Typography variant="h6">{hoverOverUser}</Typography>
            {usersSummary && usersSummary[hoverOverUser] ? (
              <Stack
                direction="column"
                spacing={1}
                sx={{ alignItems: "flex-start", paddingLeft: 3 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "space-between", width: "75%" }}
                >
                  <Stack direction="row" spacing={1}>
                    <AnimatedIcon />
                    <Typography>Assigned:</Typography>
                  </Stack>
                  <Typography>
                    {usersSummary[hoverOverUser].assigned}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "space-between", width: "75%" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <SvgIcon component={GreenTick} />
                    <Typography>Approved:</Typography>
                  </Stack>
                  <Typography>
                    {usersSummary[hoverOverUser].approved}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "space-between", width: "75%" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <SvgIcon component={RequestedChanges} />
                    <Typography>Changes Requested:</Typography>
                  </Stack>
                  <Typography>
                    {usersSummary[hoverOverUser].requestedChanges}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "space-between", width: "75%" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <SvgIcon component={OrangeDot} />
                    <Typography>Review Pending:</Typography>
                  </Stack>
                  <Typography>
                    {usersSummary[hoverOverUser].notReviewed}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography sx={{ paddingLeft: 3, fontSize: 14 }}>
                Not assigned to any pull requests.
              </Typography>
            )}
          </Stack>

          <Stack sx={{ justifyContent: "center", paddingRight: 3 }}>
            <img
              src={avatarUrl}
              alt="avatar"
              width={100}
              height={100}
              style={{
                borderRadius: "50%",
                border: `2px solid ${colors.chalk}`,
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Fade>
  );
};
