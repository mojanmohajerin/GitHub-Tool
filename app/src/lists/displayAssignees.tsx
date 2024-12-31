import type { FC } from "react";
import type { PullRequestDetailsType, UsersFilterType } from "types/types";

import { Stack, Typography } from "@mui/material";

import { colors } from "../styles/colors";

interface DisplayAssigneesProps {
  pullRequestDetails: PullRequestDetailsType;
  usersFilter: UsersFilterType;
}

export const DisplayAssignees: FC<DisplayAssigneesProps> = ({
  pullRequestDetails,
  usersFilter,
}) => {
  return (
    <Stack direction="row" sx={{ paddingLeft: 2 }}>
      <Typography sx={{ fontWeight: "bold" }}>Assigned to:</Typography>
      <Stack direction="column" spacing={1} sx={{ paddingLeft: 2 }}>
        {pullRequestDetails.assignees.map((assignee) => {
          const highlightUser = usersFilter.some(
            (user) => user.assignee && user.name === assignee
          );
          return (
            <Stack
              key={assignee}
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
                {assignee}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
