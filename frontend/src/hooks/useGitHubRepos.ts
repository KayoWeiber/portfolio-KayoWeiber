import { useEffect, useState } from "react";

const GITHUB_USERNAME = "KayoWeiber";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
const CACHE_KEY = "github-recent-repos-v2";
const CACHE_DURATION_MS = 1000 * 60 * 60 * 6;
const REPO_LIMIT = 3;

interface GitHubRepositoryResponse {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  sizeKb: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
}

interface CachedRepos {
  createdAt: number;
  repos: GitHubRepo[];
}

function readCachedRepos() {
  if (typeof window === "undefined") return null;

  try {
    const cachedValue = window.localStorage.getItem(CACHE_KEY);
    if (!cachedValue) return null;

    const cachedRepos = JSON.parse(cachedValue) as CachedRepos;
    const isValid =
      Array.isArray(cachedRepos.repos) &&
      Date.now() - cachedRepos.createdAt < CACHE_DURATION_MS;

    return isValid ? cachedRepos.repos : null;
  } catch {
    return null;
  }
}

function writeCachedRepos(repos: GitHubRepo[]) {
  if (typeof window === "undefined") return;

  try {
    const payload: CachedRepos = {
      createdAt: Date.now(),
      repos,
    };

    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures; the live request result can still be rendered.
  }
}

async function fetchRepositories(signal: AbortSignal) {
  const response = await fetch(
    `${GITHUB_REPOS_URL}?per_page=100&type=owner&sort=updated`,
    { headers: GITHUB_API_HEADERS, signal }
  );

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const rateLimitInfo =
      remaining === "0" && reset
        ? ` GitHub API rate limit reached until ${new Date(Number(reset) * 1000).toLocaleString()}.`
        : "";

    throw new Error(`GitHub API request failed with ${response.status}.${rateLimitInfo}`);
  }

  return (await response.json()) as GitHubRepositoryResponse[];
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const cachedRepos = readCachedRepos();
        if (cachedRepos) {
          setRepos(cachedRepos);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        const repositories = await fetchRepositories(controller.signal);
        const recentRepos = repositories
          .filter((repository) => !repository.fork && !repository.archived)
          .sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, REPO_LIMIT)
          .map((repository) => ({
            name: repository.name,
            url: repository.html_url,
            description: repository.description,
            language: repository.language,
            stars: repository.stargazers_count,
            forks: repository.forks_count,
            sizeKb: repository.size,
            topics: repository.topics ?? [],
            createdAt: repository.created_at,
            updatedAt: repository.updated_at,
          }));

        setRepos(recentRepos);
        writeCachedRepos(recentRepos);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("GitHub repositories request failed:", error);
          setError(error instanceof Error ? error.message : "GitHub repositories request failed");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadRepos();

    return () => controller.abort();
  }, []);

  return { repos, isLoading, error };
}
