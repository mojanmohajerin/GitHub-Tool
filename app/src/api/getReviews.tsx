export const getReviews = async (pullNumber: number, repoName: string) => {
  const owner = process.env.REACT_APP_GITHUB_OWNER;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  const url = `${process.env.REACT_APP_GITHUB_BASE_URL}/repos/${owner}/${repoName}/pulls/${pullNumber}/reviews`;

  try {
    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pull request:", error);
    throw error;
  }
};
