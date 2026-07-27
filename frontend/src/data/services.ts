import { FaCode, FaDatabase, FaProjectDiagram, FaReact, FaServer } from "react-icons/fa";
import { SiNodered } from "react-icons/si";

export const services = [
  { icon: FaCode, titleKey: "services.webDev", descriptionKey: "services.webDesc" },
  { icon: FaReact, titleKey: "services.frontend", descriptionKey: "services.frontendDesc" },
  { icon: FaServer, titleKey: "services.backendDev", descriptionKey: "services.backendDesc" },
  { icon: FaProjectDiagram, titleKey: "services.apiIntegration", descriptionKey: "services.apiDesc" },
  { icon: SiNodered, titleKey: "services.automation", descriptionKey: "services.automationDesc" },
  { icon: FaDatabase, titleKey: "services.dbDesign", descriptionKey: "services.dbDesignDesc" },
] as const;
