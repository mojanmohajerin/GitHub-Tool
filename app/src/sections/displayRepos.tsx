import type { FC } from "react";
import type {
  OpenPullRequestType,
  PullRequestDetailsType,
  PullRequestType,
  RepoType,
  UsersFilterType,
} from "types/types";

import { CircularProgress, Stack } from "@mui/material";
import { lazy, useState } from "react";

import { getReposPullRequests } from "../api/getReposPullRequests";
import { colors } from "../styles/colors";
import { RepoList } from "./RepoList";
import { DisplayPullRequest } from "./displayPullRequest";

interface RepoDataComponentProps {
  response: { repos: RepoType[]; pullRequestsPerRepo: PullRequestType[][] };
  dependabotFilter: boolean;
  draftFilter: boolean;
  usersFilter: UsersFilterType;
  setDependabots: any;
}

const RepoDataComponent: FC<RepoDataComponentProps> = ({
  response,
  dependabotFilter,
  draftFilter,
  usersFilter,
  setDependabots,
}) => {
  const [openPullRequest, setOpenPullRequest] = useState<OpenPullRequestType>({
    title: "",
    number: 0,
    base: { repo: { name: "" } },
  });
  const [pullRequestDetails, setPullRequestDetails] =
    useState<PullRequestDetailsType>({
      title: undefined,
      state: undefined,
      url: undefined,
      assignees: [],
      approvedUsers: [],
      notReviewedUsers: [],
      requestedChangesUsers: [],
    });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Stack direction={{ md: "column", lg: "row" }} spacing={{ xs: 5, lg: 5 }}>
        <RepoList
          pullRequestsPerRepo={response.pullRequestsPerRepo}
          openPullRequest={openPullRequest}
          setOpenPullRequest={setOpenPullRequest}
          dependabotFilter={dependabotFilter}
          draftFilter={draftFilter}
          usersFilter={usersFilter}
          setLoading={setLoading}
          setDependabots={setDependabots}
        />
        <Stack sx={{ position: "relative" }}>
          <DisplayPullRequest
            openPullRequest={openPullRequest}
            pullRequestDetails={pullRequestDetails}
            setPullRequestDetails={setPullRequestDetails}
            usersFilter={usersFilter}
            loading={loading}
            setLoading={setLoading}
          />
          {loading && (
            <CircularProgress
              size={80}
              sx={{
                color: colors.lime,
                position: "absolute",
                top: "25%",
                left: "45%",
                transform: "translate(-50%, -50%)",
                opacity: 0.7,
              }}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export const DisplayRepos = lazy(() =>
  getReposPullRequests().then((response) => ({
    default: (props: {
      dependabotFilter: boolean;
      draftFilter: boolean;
      usersFilter: UsersFilterType;
      setDependabots: any;
    }) => (
      <RepoDataComponent
        {...props}
        response={{
          repos: response.repos,
          pullRequestsPerRepo: response.pullRequestsPerRepo || [],
        }}
      />
    ),
  }))
);
