import type { FC } from "react";
import type {
  OpenPullRequestType,
  PullRequestType,
  UsersFilterType,
} from "types/types";

import { Link, List, Stack, Typography } from "@mui/material";
import LinkExternal01 from "@untitled-ui/icons-react/build/esm/LinkExternal01";
import { useEffect, useState } from "react";

import { pullRequestUsersList } from "../functions/pullRequestUsersList";
import { repos as sortOrder } from "../inputs/repositories";
import { colors } from "../styles/colors";
import { DisplayPullRequestUnderRepo } from "./displayPullRequestUnderRepo";

interface RepoListProps {
  pullRequestsPerRepo: PullRequestType[][];
  openPullRequest: OpenPullRequestType;
  setOpenPullRequest: any;
  dependabotFilter: boolean;
  draftFilter: boolean;
  usersFilter: UsersFilterType;
  setLoading: any;
  setDependabots: any;
}

export const RepoList: FC<RepoListProps> = ({
  pullRequestsPerRepo,
  openPullRequest,
  setOpenPullRequest,
  dependabotFilter,
  usersFilter,
  draftFilter,
  setLoading,
  setDependabots,
}) => {
  const [filteredPullRequestTitles, setFilteredPullRequestTitles] = useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchFilteredPullRequestTitles = async () => {
      const response = await pullRequestUsersList({
        usersFilter,
        pullRequestsPerRepo,
      });
      setFilteredPullRequestTitles(response);
    };

    fetchFilteredPullRequestTitles();
  }, [usersFilter, pullRequestsPerRepo]);

  useEffect(() => {
    const hasDependabots = pullRequestsPerRepo.some((pullRequests) => {
      return pullRequests.some((pullRequest) =>
        pullRequest.user.login.includes("dependabot")
      );
    });
    if (hasDependabots) setDependabots(true);
  });

  if (!filteredPullRequestTitles) return null;

  return (
    <Stack
      spacing={2}
      sx={{
        overflowX: "auto",
        scrollbarColor: `${colors.lime} transparent`,
      }}
    >
      {sortOrder.map((repoName) => {
        return (
          <List key={repoName}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "40px",
                  textDecoration: "underline",
                }}
              >
                {repoName}
              </Typography>
              <Link
                // href={`https://github.com/${process.env.REACT_APP_GITHUB_ORG}/${repoName}/pulls`}
                href=''
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkExternal01 />
              </Link>
            </Stack>

            {pullRequestsPerRepo
              .filter((pullRequests) => {
                if (pullRequests.length === 0) return false;
                return pullRequests[0].head.repo.name === repoName;
              })
              .map((pullRequests) => {
                if (pullRequests.length === 0) return null;
                return pullRequests
                  .filter((pullRequest) =>
                    dependabotFilter
                      ? pullRequest.user.login.includes("dependabot")
                      : !pullRequest.user.login.includes("dependabot")
                  )
                  .filter((pullRequest) => {
                    if (draftFilter && pullRequest.draft) return false;
                    return true;
                  })
                  .filter((pullRequest) => {
                    if (usersFilter.length === 0) return true;
                    return filteredPullRequestTitles.some(
                      (title) => title === pullRequest.title
                    );
                  })
                  .map((pullRequest) => {
                    return (
                      <DisplayPullRequestUnderRepo
                        key={pullRequest.id}
                        pullRequest={pullRequest}
                        pullRequests={pullRequests}
                        openPullRequest={openPullRequest}
                        setOpenPullRequest={setOpenPullRequest}
                        setLoading={setLoading}
                      />
                    );
                  });
              })}
          </List>
        );
      })}
    </Stack>
  );
};
