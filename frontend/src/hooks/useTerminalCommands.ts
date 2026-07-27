import { useMemo } from "react";
import type { TFunction } from "i18next";
import { technologies } from "../data/technologies";
import { contactInfo } from "../data/contactLinks";
import type { Project } from "../types/project";
import type { TimelineMilestone } from "../types/timeline";

export type TerminalCommandResult = string[];

export interface TerminalCommand {
  description: string;
  run: () => TerminalCommandResult;
}

export function useTerminalCommands(t: TFunction) {
  return useMemo(() => {
    const commands: Record<string, TerminalCommand> = {
      help: {
        description: t("terminal.commands.help"),
        run: () =>
          Object.entries(commands).map(
            ([name, command]) => `  ${name.padEnd(10)} ${command.description}`
          ),
      },
      about: {
        description: t("terminal.commands.about"),
        run: () => [t("terminal.aboutResponse")],
      },
      projects: {
        description: t("terminal.commands.projects"),
        run: () => {
          const projects = t("portfolio.projects", { returnObjects: true }) as Project[];
          if (!Array.isArray(projects) || projects.length === 0) return [t("terminal.empty")];

          return projects.flatMap((project) => [
            `- ${project.title}`,
            `  ${project.technologies?.join(", ") ?? ""}`,
          ]);
        },
      },
      skills: {
        description: t("terminal.commands.skills"),
        run: () => [technologies.map((tech) => tech.name).join(", ")],
      },
      timeline: {
        description: t("terminal.commands.timeline"),
        run: () => {
          const milestones = t("timeline.milestones", { returnObjects: true }) as TimelineMilestone[];
          if (!Array.isArray(milestones) || milestones.length === 0) return [t("terminal.empty")];

          return milestones.flatMap((milestone) => [
            `${milestone.period} — ${milestone.title} @ ${milestone.organization}`,
          ]);
        },
      },
      contact: {
        description: t("terminal.commands.contact"),
        run: () => [
          `email: ${contactInfo.email}`,
          `linkedin: ${contactInfo.linkedinUrl}`,
          `github: ${contactInfo.githubUrl}`,
        ],
      },
      "sudo hire-me": {
        description: t("terminal.commands.hireMe"),
        run: () => [t("terminal.hireMeResponse")],
      },
    };

    return commands;
  }, [t]);
}
