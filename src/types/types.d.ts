export interface GithubUserApi {
  avatar_url: string;
  bio: string | null;
  name: string | null;
  public_repos: number;
  html_url: string;
}

export interface User {
  avatarUrl: string;
  bio: string | null;
  name: string | null;
  publicRepos: number;
  htmlUrl: string;
}
