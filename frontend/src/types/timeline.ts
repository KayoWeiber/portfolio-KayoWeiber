export type TimelineMilestoneType = "education" | "work";

export interface TimelineMilestone {
  period: string;
  startDate: string;
  title: string;
  organization: string;
  location?: string;
  description: string;
  type: TimelineMilestoneType;
}
