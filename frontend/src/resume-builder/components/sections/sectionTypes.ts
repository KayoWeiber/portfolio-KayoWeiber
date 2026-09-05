import type { Dispatch, SetStateAction } from "react";
import type { ResumeBuilderData } from "../../types/resumeBuilder";

export interface ResumeSectionProps {
  data: ResumeBuilderData;
  setData: Dispatch<SetStateAction<ResumeBuilderData>>;
}

export const moveItem = <T,>(items: T[], index: number, direction: -1 | 1) => {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};
