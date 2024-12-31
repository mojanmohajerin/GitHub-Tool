import type {
  PullRequestType,
  ReviewsType,
  UsersFilterType,
} from "types/types";

import { getReviews } from "../api/getReviews";

interface PullRequestUsersListProps {
  usersFilter: UsersFilterType;
  pullRequestsPerRepo: PullRequestType[][];
}

export const pullRequestUsersList = async ({
  usersFilter,
  pullRequestsPerRepo,
}: PullRequestUsersListProps) => {
  let filteredPullRequestTitles = await Promise.all(
    pullRequestsPerRepo.map(async (pullRequests) => {
      return Promise.all(
        pullRequests.map(async (pullRequest) => {
          if (
            pullRequest.assignees.some((assignee) =>
              usersFilter.some(
                (filteredUser) =>
                  filteredUser.name === assignee.login && filteredUser.assignee
              )
            ) ||
            pullRequest.requested_reviewers.some((reviewer) =>
              usersFilter.some(
                (filteredUser) =>
                  filteredUser.name === reviewer.login && filteredUser.reviewer
              )
            )
          ) {
            return pullRequest.title;
          }

          const pullNumber = pullRequest.number;
          const repoName = pullRequest.head.repo.name;

          const responseReviews: ReviewsType = await getReviews(
            pullNumber,
            repoName
          );
          return responseReviews
            .filter((review) =>
              usersFilter.some(
                (filteredUser) =>
                  filteredUser.name === review.user.login &&
                  filteredUser.reviewer
              )
            )
            .map(() => pullRequest.title);
        })
      );
    })
  ).then((result) =>
    result
      .flat()
      .filter((pullRequest) => pullRequest.length !== 0)
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index)
  );

  return filteredPullRequestTitles;
};
