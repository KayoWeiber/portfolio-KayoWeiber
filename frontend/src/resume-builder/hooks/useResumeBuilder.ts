import { useCallback, useEffect, useRef, useState } from "react";
import { createDefaultResume } from "../data/defaultResume";
import { loadResume, removeStoredResume, saveResume } from "../storage/resumeStorage";
import type { ResumeBuilderData } from "../types/resumeBuilder";

export type SaveStatus = "saved" | "saving" | "error";

export const useResumeBuilder = () => {
  const [data, setData] = useState<ResumeBuilderData>(loadResume);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const skipNextSave = useRef(false);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    setSaveStatus("saving");
    const timeoutId = window.setTimeout(() => {
      try {
        saveResume(data);
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [data]);

  const clearResume = useCallback(() => {
    skipNextSave.current = true;
    setData(createDefaultResume());
    try {
      removeStoredResume();
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, []);

  return { data, setData, saveStatus, clearResume };
};
