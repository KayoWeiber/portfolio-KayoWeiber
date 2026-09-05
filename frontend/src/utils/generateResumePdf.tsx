import { pdf } from "@react-pdf/renderer";
import { ResumeDocument } from "../components/resume/ResumeDocument";
import type { ResumeData } from "../types/resume";

const RESUME_FILENAME = "Kayo-Weiber-Curriculo.pdf";

export const generateResumePdf = async (data: ResumeData) => {
  const blob = await pdf(<ResumeDocument data={data} />).toBlob();
  const objectUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = objectUrl;
  downloadLink.download = RESUME_FILENAME;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
};
