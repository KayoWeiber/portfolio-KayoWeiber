import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCodeBranch, FaDatabase, FaStar } from "react-icons/fa";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

function formatRepoSize(sizeKb: number) {
  if (sizeKb < 1024) return `${sizeKb} KB`;
  return `${(sizeKb / 1024).toFixed(1)} MB`;
}

const GitHubActivityPanel = ({ isInView }: { isInView: boolean }) => {
  const { t, i18n } = useTranslation();
  const { repos: githubRepos, isLoading: isLoadingRepos } = useGitHubRepos();

  if (isLoadingRepos || githubRepos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-12"
    >
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {t("About.githubActivity")}
      </h4>

      <div className="grid gap-4 md:grid-cols-3">
        {githubRepos.map((repo, index) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 transition-all hover:border-sky-300/60 hover:bg-slate-800/80"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-semibold text-white group-hover:text-sky-300">
                {repo.name}
              </span>

              <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-300">
                <FaStar className="text-amber-300" aria-hidden="true" />
                {repo.stars}
              </span>
            </div>

            {repo.language && (
              <span className="mt-2 inline-flex w-fit rounded-full border border-sky-500/30 px-2 py-0.5 text-xs font-medium text-sky-200">
                {repo.language}
              </span>
            )}

            {repo.description && (
              <p className="mt-3 line-clamp-2 text-sm text-slate-400">{repo.description}</p>
            )}

            {repo.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {repo.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-slate-400">
              <span>
                {t("About.githubCreatedAt", {
                  date: new Intl.DateTimeFormat(i18n.resolvedLanguage, {
                    month: "short",
                    year: "numeric",
                  }).format(new Date(repo.createdAt)),
                })}
              </span>

              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FaDatabase aria-hidden="true" />
                  {formatRepoSize(repo.sizeKb)}
                </span>

                <span className="flex items-center gap-1">
                  <FaCodeBranch aria-hidden="true" />
                  {repo.forks}
                </span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default GitHubActivityPanel;
