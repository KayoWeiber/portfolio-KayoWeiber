import { useEffect, useState } from "react";

const GITHUB_USERNAME = "KayoWeiber";
const LANGUAGE_GROUPS: Record<string, string[]> = {
  SQL: ["SQL", "PLpgSQL", "PLSQL", "TSQL"],
};

interface GitHubRepository {
  languages_url: string;
}

export interface GitHubLanguageStat {
  name: string;
  percentage: string;
  value: number;
  bytes: number;
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

export function useGitHubLanguageStats() {
  const [languages, setLanguages] = useState<GitHubLanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLanguageStats() {
      try {
        setIsLoading(true);

        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`,
          { signal: controller.signal }
        );

        if (!reposResponse.ok) {
          throw new Error("GitHub repositories request failed");
        }

        const repositories = (await reposResponse.json()) as GitHubRepository[];
        const languageResponses = await Promise.all(
          repositories.map(async (repository) => {
            const response = await fetch(repository.languages_url, {
              signal: controller.signal,
            });

            if (!response.ok) return {};
            return (await response.json()) as Record<string, number>;
          })
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

        const totalBytes = Object.values(groupedTotals).reduce(
          (sum, bytes) => sum + bytes,
          0
        );

        const rankedLanguages = Object.entries(groupedTotals)
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

        setLanguages(rankedLanguages);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("GitHub language stats request failed:", error);
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

  return { languages, isLoading };
}
