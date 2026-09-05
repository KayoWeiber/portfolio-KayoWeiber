import type { ResumeTemplateId } from "../types/resumeBuilder";

export interface TemplateDefinition {
  id: ResumeTemplateId;
  nameKey: string;
  descriptionKey: string;
  accent: string;
}

export const resumeTemplates: TemplateDefinition[] = [
  { id: "professional", nameKey: "resumeBuilder.templates.professional.name", descriptionKey: "resumeBuilder.templates.professional.description", accent: "#111827" },
  { id: "modern", nameKey: "resumeBuilder.templates.modern.name", descriptionKey: "resumeBuilder.templates.modern.description", accent: "#0284c7" },
  { id: "minimal", nameKey: "resumeBuilder.templates.minimal.name", descriptionKey: "resumeBuilder.templates.minimal.description", accent: "#64748b" },
];
