import type { FC } from "react";
import type { PullRequestDetailsType, UsersFilterType } from "types/types";

import { Stack, SvgIcon, Typography } from "@mui/material";

import { ReactComponent as GreenTick } from "../assets/githubIcons/greenTick.svg";
import { ReactComponent as OrangeDot } from "../assets/githubIcons/orange-dot.svg";
import { ReactComponent as RequestedChanges } from "../assets/githubIcons/requestedChanges.svg";
import { colors } from "../styles/colors";

interface DisplayReviewersProps {
  pullRequestDetails: PullRequestDetailsType;
  usersFilter: UsersFilterType;
}

export const DisplayReviewers: FC<DisplayReviewersProps> = ({
  pullRequestDetails,
  usersFilter,
}) => {
  return (
    <Stack direction="row" sx={{ paddingX: 2 }}>
      <Typography sx={{ fontWeight: "bold" }} noWrap>
        Requested Reviewers:
      </Typography>
      <Stack direction="column" spacing={1} sx={{ paddingLeft: 2 }}>
        {pullRequestDetails.notReviewedUsers.map((reviewer) => {
          const highlightUser = usersFilter.some(
            (user) => user.reviewer && user.name === reviewer
          );
          return (
            <Stack
              key={reviewer}
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "space-between",
                width: "100%",
                paddingRight: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: highlightUser ? colors.highlight : null,
                }}
              >
                {reviewer}
              </Typography>
              <SvgIcon component={OrangeDot} />
            </Stack>
          );
        })}

        {pullRequestDetails.requestedChangesUsers.map((reviewer) => {
          const highlightUser = usersFilter.some(
            (user) => user.reviewer && user.name === reviewer
          );
          return (
            <Stack
              key={reviewer}
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "space-between",
                width: "100%",
                paddingRight: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: highlightUser ? colors.highlight : null,
                }}
              >
                {reviewer}
              </Typography>
              <SvgIcon component={RequestedChanges} />
            </Stack>
          );
        })}

        {pullRequestDetails.approvedUsers.map((reviewer) => {
          const highlightUser = usersFilter.some(
            (user) => user.reviewer && user.name === reviewer
          );
          return (
            <Stack
              key={reviewer}
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "space-between",
                width: "100%",
                paddingRight: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: highlightUser ? colors.highlight : null,
                }}
              >
                {reviewer}
              </Typography>
              <SvgIcon component={GreenTick} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
