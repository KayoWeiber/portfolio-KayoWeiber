import { useEffect, useState } from "react";

const GITHUB_USERNAME = "KayoWeiber";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
const CACHE_KEY = "github-language-stats";
const CACHE_DURATION_MS = 1000 * 60 * 60 * 6;
const LANGUAGE_GROUPS: Record<string, string[]> = {
  SQL: ["SQL", "PLpgSQL", "PLSQL", "TSQL"],
};

interface GitHubRepository {
  languages_url: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

export interface GitHubLanguageStat {
  name: string;
  percentage: string;
  value: number;
  bytes: number;
}

interface CachedLanguageStats {
  createdAt: number;
  languages: GitHubLanguageStat[];
}

function getLanguageGroup(language: string) {
  const matchedGroup = Object.entries(LANGUAGE_GROUPS).find(([, aliases]) =>
    aliases.includes(language)
  );

  return matchedGroup?.[0] || language;
}

function toPercent(value: number, total: number) {
  if (!total) return { percentage: "0%", value: 0 };

  const nextValue = Math.round((value / total) * 100);
  return {
    percentage: `${nextValue}%`,
    value: nextValue,
  };
}

function readCachedStats() {
  if (typeof window === "undefined") return null;

  try {
    const cachedValue = window.localStorage.getItem(CACHE_KEY);
    if (!cachedValue) return null;

    const cachedStats = JSON.parse(cachedValue) as CachedLanguageStats;
    const isValid =
      Array.isArray(cachedStats.languages) &&
      Date.now() - cachedStats.createdAt < CACHE_DURATION_MS;

    return isValid ? cachedStats.languages : null;
  } catch {
    return null;
  }
}

function writeCachedStats(languages: GitHubLanguageStat[]) {
  if (typeof window === "undefined") return;

  try {
    const payload: CachedLanguageStats = {
      createdAt: Date.now(),
      languages,
    };

    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures; the live request result can still be rendered.
  }
}

async function fetchGitHubJson<T>(url: string, signal: AbortSignal) {
  const response = await fetch(url, {
    headers: GITHUB_API_HEADERS,
    signal,
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const rateLimitInfo =
      remaining === "0" && reset
        ? ` GitHub API rate limit reached until ${new Date(Number(reset) * 1000).toLocaleString()}.`
        : "";

    throw new Error(`GitHub API request failed with ${response.status}.${rateLimitInfo}`);
  }

  return (await response.json()) as T;
}

async function fetchRepositories(signal: AbortSignal) {
  const repositories: GitHubRepository[] = [];
  let page = 1;

  while (true) {
    const pageRepositories = await fetchGitHubJson<GitHubRepository[]>(
      `${GITHUB_REPOS_URL}?per_page=100&page=${page}&type=owner&sort=updated`,
      signal
    );

    repositories.push(...pageRepositories);

    if (pageRepositories.length < 100) break;
    page += 1;
  }

  return repositories.filter((repository) => !repository.fork && !repository.archived);
}

function rankLanguageTotals(groupedTotals: Record<string, number>) {
  const totalBytes = Object.values(groupedTotals).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  return Object.entries(groupedTotals)
    .map(([name, bytes]) => {
      const percent = toPercent(bytes, totalBytes);
      return {
        name,
        bytes,
        percentage: percent.percentage,
        value: percent.value,
      };
    })
    .filter((language) => language.bytes > 0)
    .sort((a, b) => b.bytes - a.bytes);
}

export function useGitHubLanguageStats() {
  const [languages, setLanguages] = useState<GitHubLanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLanguageStats() {
      try {
        const cachedStats = readCachedStats();
        if (cachedStats) {
          setLanguages(cachedStats);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        const repositories = await fetchRepositories(controller.signal);
        const languageResults = await Promise.allSettled(
          repositories.map(async (repository) => {
            return fetchGitHubJson<Record<string, number>>(
              repository.languages_url,
              controller.signal
            );
          })
        );
        const languageResponses = languageResults.flatMap((result) =>
          result.status === "fulfilled" ? [result.value] : []
        );

        const groupedTotals = languageResponses.reduce<Record<string, number>>(
          (acc, repositoryLanguages) => {
            Object.entries(repositoryLanguages).forEach(([language, bytes]) => {
              const group = getLanguageGroup(language);
              acc[group] = (acc[group] || 0) + bytes;
            });
            return acc;
          },
          {}
        );

        if (Object.keys(groupedTotals).length === 0) {
          repositories.forEach((repository) => {
            if (!repository.language) return;

            const group = getLanguageGroup(repository.language);
            groupedTotals[group] = (groupedTotals[group] || 0) + 1;
          });
        }

        const rankedLanguages = rankLanguageTotals(groupedTotals);
        setLanguages(rankedLanguages);
        writeCachedStats(rankedLanguages);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("GitHub language stats request failed:", error);
          setError(error instanceof Error ? error.message : "GitHub language stats request failed");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadLanguageStats();

    return () => controller.abort();
  }, []);

  return { languages, isLoading, error };
}
