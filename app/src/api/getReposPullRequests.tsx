import axios from "axios";

import { RepoType } from "types/types";

export async function getReposPullRequests() {
  let repos;
  let pullRequestsPerRepo;

  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const org = process.env.REACT_APP_GITHUB_ORG;
  const owner = process.env.REACT_APP_GITHUB_OWNER;

  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GITHUB_BASE_URL}/orgs/${org}/repos`,
      {
        headers,
      }
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
  }
  return { repos, pullRequestsPerRepo };
}
