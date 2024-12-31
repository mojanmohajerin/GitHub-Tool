import type {
    RepoType,
    ReviewerType,
    ReviewsType,
    UsersSummaryType,
} from "types/types";

import axios from "axios";

import { getReviews } from "./getReviews";

type PullRequests = {
  assignees: ReviewerType[];
  number: number;
  head: {
    repo: {
      name: string;
    };
  };
  requested_reviewers: ReviewerType[];
}[];

export const getUsersSummary = async () => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const org = process.env.REACT_APP_GITHUB_ORG;
  const owner = process.env.REACT_APP_GITHUB_OWNER;

  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  let repos;
  let pullRequestsPerRepo;

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GITHUB_BASE_URL}/orgs/${org}/repos`,
      { headers }
    );
    repos = response.data.filter((repo: RepoType) =>
      repos.includes(repo.name)
    );

    if (!repos) {
      throw new Error("Error finding SK repos");
    }

    pullRequestsPerRepo = await Promise.all(
      repos.map(async (repo: RepoType) => {
        const pulls = await axios.get(
          `${process.env.REACT_APP_GITHUB_BASE_URL}/repos/${owner}/${repo.name}/pulls?state=open`,
          { headers }
        );
        return pulls.data;
      })
    );
  } catch (error) {
    console.error("Error fetching PRs:", error);
    throw error;
  }

  const userSummary: UsersSummaryType = {};

  pullRequestsPerRepo.forEach((pullRequests: PullRequests) => {
    pullRequests.forEach(async (pullRequest) => {
      const assignees = pullRequest.assignees.map(
        (assignees: ReviewerType) => assignees.login
      );

      const reviews: ReviewsType = await getReviews(
        pullRequest.number,
        pullRequest.head.repo.name
      );
      const approvedUsers = reviews
        .filter((review) => review.state === "APPROVED")
        .map((review) => review.user.login);
      const notReviewedUsers = pullRequest.requested_reviewers.map(
        (reviewer) => reviewer.login
      );
      let requestedChangesUsers = reviews
        .filter((review) => {
          return (
            !assignees.some((assignee) => review.user.login === assignee) &&
            !approvedUsers.some(
              (approvedUser) => review.user.login === approvedUser
            ) &&
            !notReviewedUsers.some(
              (notReviewedUser) => review.user.login === notReviewedUser
            ) &&
            (review.state === "CHANGES_REQUESTED" ||
              review.state === "COMMENTED")
          );
        })
        .map((review) => review.user.login);

      requestedChangesUsers = [...new Set(requestedChangesUsers)];

      assignees.forEach((assignee) => {
        if (!userSummary[assignee]) {
          userSummary[assignee] = {
            assigned: 0,
            approved: 0,
            requestedChanges: 0,
            notReviewed: 0,
          };
        }
        userSummary[assignee].assigned += 1;
      });

      notReviewedUsers.forEach((reviewer) => {
        if (!userSummary[reviewer]) {
          userSummary[reviewer] = {
            assigned: 0,
            approved: 0,
            requestedChanges: 0,
            notReviewed: 0,
          };
        }
        userSummary[reviewer].notReviewed += 1;
      });

      approvedUsers.forEach((reviewer) => {
        if (!userSummary[reviewer]) {
          userSummary[reviewer] = {
            assigned: 0,
            approved: 0,
            requestedChanges: 0,
            notReviewed: 0,
          };
        }
        userSummary[reviewer].approved += 1;
      });

      requestedChangesUsers.forEach((reviewer) => {
        if (!userSummary[reviewer]) {
          userSummary[reviewer] = {
            assigned: 0,
            approved: 0,
            requestedChanges: 0,
            notReviewed: 0,
          };
        }
        userSummary[reviewer].requestedChanges += 1;
      });
    });
  });

  return userSummary;
};
