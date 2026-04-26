export type CourseCategory = "all" | "backend" | "cloud" | "frontend" | "data" | "fundamentals";

export interface Course {
  imageSrc: string;
  title: string;
  description: string;
  category: Exclude<CourseCategory, "all">;
}
