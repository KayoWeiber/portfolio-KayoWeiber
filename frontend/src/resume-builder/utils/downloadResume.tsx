import { pdf } from "@react-pdf/renderer";
import { VisitorResumeDocument } from "../templates/VisitorResumeDocument";
import type { ResumeBuilderData, ResumeDocumentLabels } from "../types/resumeBuilder";
import { createResumeFilename } from "./format";

export const downloadVisitorResume = async (
  data: ResumeBuilderData,
  labels: ResumeDocumentLabels,
  locale: string
) => {
  const blob = await pdf(<VisitorResumeDocument data={data} labels={labels} locale={locale} />).toBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = createResumeFilename(data.personal.fullName);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
};
