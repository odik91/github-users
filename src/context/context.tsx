/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";
import mockUser from "./mockData.js/mockUser";
// import { GithubUser, Repos, Followers } from "./types"; // Assuming you move the types to a separate file

const rootUrl = "https://api.github.com";

export type GithubUser = {
  login: string;
  id: number | string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number | string;
  public_gists: number | string;
  followers: number | string;
  following: number | string;
  created_at: string;
  updated_at: string;
};

export type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
};

export type Repos = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: unknown;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};

export type Followers = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

// Define the shape of the context
type GithubContextType = {
  githubUser: GithubUser;
  repos: Repos[];
  followers: Followers[];
  request: number;
  error: ErrorType;
  searchGithubUser: (user: string) => Promise<void>;
  setGithubUser: React.Dispatch<React.SetStateAction<GithubUser>>;
  setRepos: React.Dispatch<React.SetStateAction<Repos[]>>;
  setFollowers: React.Dispatch<React.SetStateAction<Followers[]>>;
};

// Create the default values for the context
const defaultGithubUser: GithubUser = {
  login: "",
  id: 0,
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "",
  site_admin: false,
  name: "",
  company: "",
  blog: "",
  location: "",
  email: "",
  hireable: "",
  bio: "",
  twitter_username: "",
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
};

export type ResponseData = {
  data: ResponseDataResources;
  status: number;
  statusText: string;
  headers: unknown;
  config: unknown;
  request: unknown;
};

type ResponseDataResources = {
  resources: DataResources;
  rate: ResourcesChild;
};

type DataResources = {
  core: ResourcesChild;
  graphql: ResourcesChild;
  integration_manifest: ResourcesChild;
  search: ResourcesChild;
};

type ResourcesChild = {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
  resource: string;
};

type ErrorType = { show: boolean; msg: string };

const defaultValueRepos: Repos[] = []; // Initialize as an empty array
const defaultValueFollowers: Followers[] = []; // Initialize as an empty array
const defaultValueRequest: number = 0; // Initialize as an empty array
const defaultValueError: ErrorType = { show: false, msg: "" };

// Create the context with the proper type
const GithubContext = createContext<GithubContextType>({
  githubUser: defaultGithubUser,
  repos: defaultValueRepos,
  followers: defaultValueFollowers,
  request: defaultValueRequest,
  error: defaultValueError,
  searchGithubUser: async (): Promise<void> => {},
  setGithubUser: () => {},
  setRepos: () => {},
  setFollowers: () => {},
});

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [githubUser, setGithubUser] = useState<GithubUser>(mockUser);
  const [repos, setRepos] = useState<Repos[]>(mockRepos);
  const [followers, setFollowers] = useState<Followers[]>(mockFollowers);

  // request loading
  const [request, setRequest] = useState(0);
  // const [loading, isLoading] = useState(false);

  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user: string) => {
    toggleError();
    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      if (response) {
        setGithubUser(response.data);
      } else {
        toggleError(true, "there is no user with that username");
      }
    } catch (error) {
      console.log(error);
      toggleError(true, "there is no user with that username");
    }
  };

  // check rate
  const checkRequests = async (): Promise<void> => {
    try {
      const response = await axios(`${rootUrl}/rate_limit`);
      const { data } = response;
      const { rate } = data;
      setRequest(rate.remaining);
      // setRequest(0);
      if (rate.remaining === 0) {
        toggleError(true, "sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleError = (show: boolean = false, msg: string = ""): void => {
    setError({ show, msg });
  };

  // error
  useEffect(() => {
    checkRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        setGithubUser,
        setRepos,
        setFollowers,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useGithubContext = () => useContext(GithubContext);

export { GithubContext, GithubProvider };
