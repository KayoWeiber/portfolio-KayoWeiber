import { PDFViewer } from "@react-pdf/renderer";
import { VisitorResumeDocument } from "../templates/VisitorResumeDocument";
import type { ResumeBuilderData, ResumeDocumentLabels } from "../types/resumeBuilder";

interface ResumePreviewProps {
  data: ResumeBuilderData;
  labels: ResumeDocumentLabels;
  locale: string;
}

export const ResumePreview = ({ data, labels, locale }: ResumePreviewProps) => (
  <PDFViewer width="100%" height="100%" showToolbar={false} className="border-0">
    <VisitorResumeDocument data={data} labels={labels} locale={locale} />
  </PDFViewer>
);
