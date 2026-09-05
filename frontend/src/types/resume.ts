export interface ResumeContact {
  label: string;
  value: string;
  href: string;
}

export interface ResumeEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface ResumeProject {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
}

export interface ResumeData {
  profile: {
    name: string;
    role: string;
    avatarUrl: string;
    summary: string;
    location?: string;
  };
  contacts: ResumeContact[];
  experience: ResumeEntry[];
  education: ResumeEntry[];
  skills: string[];
  projects: ResumeProject[];
  courses: string[];
  labels: {
    profile: string;
    contacts: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    courses: string;
    location: string;
  };
}
