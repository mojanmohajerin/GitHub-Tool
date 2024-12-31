export interface ReviewerType {
  login: string;
}

export interface RepoType {
  id: number;
  name: string;
  owner: ReviewerType;
}

export type ReviewsType = {
  id: number;
  state: string;
  user: ReviewerType;
  submitted_at: string;
  html_url: string;
  body: string;
}[];

export interface UsersSummaryType {
  [key: string]: {
    assigned: number;
    approved: number;
    requestedChanges: number;
    notReviewed: number;
  };
}

export interface PullRequestDetailsType {
  title: string | undefined;
  state: string | undefined;
  url: string | undefined;
  assignees: string[];
  approvedUsers: string[];
  notReviewedUsers: string[];
  requestedChangesUsers: string[];
}

export type UsersFilterType = {
  name: string;
  assignee: boolean;
  reviewer: boolean;
}[];

export interface OpenPullRequestType {
  title: string;
  number: number;
  base: {
    repo: {
      name: string;
    };
  };
}

export interface PullRequestType {
  id: string;
  title: string;
  number: number;
  draft: boolean;
  html_url: string;
  mergeable_state: string;
  head: { repo: { name: string } };
  user: ReviewerType;
  assignees: ReviewerType[];
  requested_reviewers: ReviewerType[];
}

export type UsersType = { id: number; login: string; avatar_url: string }[];
