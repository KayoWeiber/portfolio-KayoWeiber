export type TerminalLineType = "input" | "output" | "error";

export interface TerminalLine {
  type: TerminalLineType;
  content: string;
}
