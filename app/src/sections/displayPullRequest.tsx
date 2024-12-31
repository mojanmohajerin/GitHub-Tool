import type { Dispatch, FC, SetStateAction } from "react";
import type {
  OpenPullRequestType,
  PullRequestDetailsType,
  PullRequestType,
  ReviewsType,
  UsersFilterType,
} from "types/types";

import { Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getPullRequest } from "../api/getPullRequest";
import { getReviews } from "../api/getReviews";
import { DraftIcon } from "../assets/githubIcons/draftIcon";
import { OpenIcon } from "../assets/githubIcons/openIcon";
import { NoPullRequestText } from "../components/noPullRequestText";
import { CustomButton } from "../customComponents/customButton";
import { XCloseButton } from "../customComponents/xCloseButton";
import { DisplayAssignees } from "../lists/displayAssignees";
import { DisplayMergeState } from "../lists/displayMergeState";
import { DisplayReviewers } from "../lists/displayReviewers";
import { ReviewCommentDrawer } from "./reviewCommentsDrawer";

interface PullRequestDataComponentProps {
  pullRequestDetails: PullRequestDetailsType;
  setPullRequestDetails: Dispatch<SetStateAction<PullRequestDetailsType>>;
  usersFilter: UsersFilterType;
  loading: boolean;
  reviews: ReviewsType;
  mergeState: string;
}

interface DisplayPullRequestProps {
  openPullRequest: OpenPullRequestType;
  pullRequestDetails: PullRequestDetailsType;
  setPullRequestDetails: Dispatch<SetStateAction<PullRequestDetailsType>>;
  usersFilter: UsersFilterType;
  loading: boolean;
  setLoading: any;
}

const PullRequestDataComponent: FC<PullRequestDataComponentProps> = ({
  pullRequestDetails,
  setPullRequestDetails,
  usersFilter,
  loading,
  reviews,
  mergeState,
}) => {
  const [openReviewCommentsDrawer, setOpenReviewCommentsDrawer] =
    useState(false);

  const handleClose = () => {
    setPullRequestDetails({
      title: undefined,
      state: undefined,
      url: undefined,
      assignees: [],
      approvedUsers: [],
      notReviewedUsers: [],
      requestedChangesUsers: [],
    });
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{ padding: 5, opacity: loading ? 0.4 : 1 }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", width: "100%" }}
        >
          {pullRequestDetails.state === "Open" ? <OpenIcon /> : <DraftIcon />}
          <XCloseButton handleClose={handleClose} />
        </Stack>
        <Link href={pullRequestDetails.url} target="_blank">
          <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
            {pullRequestDetails.title}
          </Typography>
        </Link>
        <Stack direction="column" spacing={5}>
          <Stack direction="column" spacing={2}>
            <DisplayAssignees
              pullRequestDetails={pullRequestDetails}
              usersFilter={usersFilter}
            />
            <DisplayReviewers
              pullRequestDetails={pullRequestDetails}
              usersFilter={usersFilter}
            />
          </Stack>
          <DisplayMergeState mergeState={mergeState} />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "flex-start", paddingTop: 5 }}
        >
          <CustomButton
            text="Preview Review Comments"
            handleClick={() => setOpenReviewCommentsDrawer(true)}
          />
        </Stack>
      </Stack>
      <ReviewCommentDrawer
        openReviewCommentsDrawer={openReviewCommentsDrawer}
        setOpenReviewCommentsDrawer={setOpenReviewCommentsDrawer}
        reviews={reviews}
      />
    </>
  );
};

export const DisplayPullRequest: FC<DisplayPullRequestProps> = ({
  openPullRequest,
  pullRequestDetails,
  setPullRequestDetails,
  usersFilter,
  loading,
  setLoading,
}) => {
  const [reviews, setReviews] = useState<ReviewsType>([]);
  const [mergeState, setMergeState] = useState("");

  useEffect(() => {
    if (openPullRequest?.title) {
      const pullNumber = openPullRequest.number;
      const repoName = openPullRequest.base?.repo.name;

      getPullRequest(pullNumber, repoName).then(
        (responsePullRequest: PullRequestType) => {
          getReviews(pullNumber, repoName).then(
            (responseReviews: ReviewsType) => {
              setReviews(responseReviews);
              setMergeState(responsePullRequest.mergeable_state);

              // Get users assigned to PR
              const assignees = responsePullRequest.assignees.map(
                (assignee) => assignee.login
              );

              // Get users who have approved PR
              const approvedUsers = responseReviews
                .filter((review) => review.state === "APPROVED")
                .map((review) => review.user.login);

              // Get users who have not yet reviewed PR
              const notReviewedUsers =
                responsePullRequest.requested_reviewers.map(
                  (reviewer) => reviewer.login
                );

              // Get users who have requested changes on PR
              let requestedChangesUsers = responseReviews
                .filter(
                  (review) =>
                    !assignees.some(
                      (assignee) => review.user.login === assignee
                    ) &&
                    !approvedUsers.some(
                      (approvedUser) => review.user.login === approvedUser
                    ) &&
                    !notReviewedUsers.some(
                      (notReviewedUser) => review.user.login === notReviewedUser
                    ) &&
                    (review.state === "CHANGES_REQUESTED" ||
                      review.state === "COMMENTED")
                )
                .map((review) => review.user.login);

              requestedChangesUsers = [...new Set(requestedChangesUsers)]; // Remove duplicates

              setPullRequestDetails({
                title: responsePullRequest.title,
                state: responsePullRequest.draft ? "Draft" : "Open",
                url: responsePullRequest.html_url,
                assignees: assignees,
                approvedUsers: approvedUsers,
                notReviewedUsers: notReviewedUsers,
                requestedChangesUsers: requestedChangesUsers,
              });

              setLoading(false);
            }
          );
        }
      );
    }
  }, [openPullRequest, setLoading, setPullRequestDetails]);

  if (!pullRequestDetails.title) {
    return <NoPullRequestText />;
  }

  return (
    <PullRequestDataComponent
      pullRequestDetails={pullRequestDetails}
      setPullRequestDetails={setPullRequestDetails}
      usersFilter={usersFilter}
      loading={loading}
      reviews={reviews}
      mergeState={mergeState}
    />
  );
};
