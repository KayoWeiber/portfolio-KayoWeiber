import { useEffect } from "react";

const DEFAULT_TITLE = "Kayo Weiber - Desenvolvedor Full Stack";
const DEFAULT_DESCRIPTION =
  "Portfólio de Kayo Weiber, graduando em Sistemas de Informação pela UEMG e desenvolvedor full-stack, motivado por transformar ideias em soluções digitais.";

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute("content", description);

    return () => {
      document.title = DEFAULT_TITLE;
      descriptionTag?.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
