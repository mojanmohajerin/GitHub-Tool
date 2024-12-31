import type { FC } from "react";

import {
  Button,
  Link,
  ListItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import LinkExternal01 from "@untitled-ui/icons-react/build/esm/LinkExternal01";
import { OpenPullRequestType, PullRequestType } from "types/types";

interface DisplayPullRequestUnderRepoProps {
  pullRequest: PullRequestType;
  pullRequests: PullRequestType[];
  openPullRequest: OpenPullRequestType;
  setOpenPullRequest: any;
  setLoading: any;
}

export const DisplayPullRequestUnderRepo: FC<
  DisplayPullRequestUnderRepoProps
> = ({
  pullRequest,
  pullRequests,
  openPullRequest,
  setOpenPullRequest,
  setLoading,
}) => {
  let pullRequestTitle = pullRequest.title;
  let shortcutCode;
  const match = pullRequest.title.match(/\[.*\]/g);

  if (match) {
    const match2 = match[0].trim();
    pullRequestTitle = pullRequestTitle.replace(match2, "");
    shortcutCode = match2;
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    const clickedPullRequest = pullRequests.find((pullRequest) =>
      pullRequest.title.includes((event.target as HTMLButtonElement).innerText)
    );
    setOpenPullRequest(clickedPullRequest);
  };

  return (
    <ListItem key={pullRequest.id} sx={{ paddingY: 0, paddingLeft: 5 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingRight: 2,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "flex-start", width: 580 }}>
          <Button
            onClick={handleClick}
            sx={{
              pointerEvents:
                openPullRequest?.title === pullRequest.title ? "none" : "auto",
            }}
          >
            <Typography
              sx={{
                fontWeight:
                  pullRequest.title === openPullRequest?.title
                    ? "bold"
                    : "none",
                opacity: pullRequest.draft ? 0.6 : 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "550px",
              }}
            >
              {pullRequestTitle}
            </Typography>
          </Button>
          <Stack sx={{ marginLeft: -1 }}>
            <Link href={pullRequest.html_url} target="_blank">
              <SvgIcon sx={{ height: "15px" }}>
                <LinkExternal01 />
              </SvgIcon>
            </Link>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: 80,
          }}
        >
          <Typography
            sx={{
              fontWeight:
                pullRequest.title === openPullRequest?.title ? "bold" : "none",
              opacity: pullRequest.draft ? 0.6 : 1,
            }}
            noWrap
          >
            {shortcutCode}
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
};
