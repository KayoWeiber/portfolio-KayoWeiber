export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const normalizeUrl = (value: string) => {
  if (!value) return "";
  if (/^(https?:|mailto:)/i.test(value)) return value;
  return `https://${value}`;
};

export const formatMonth = (value: string, locale: string) => {
  if (!value) return "";
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
    new Date(year, month - 1, 1)
  );
};

export const createResumeFilename = (name: string) => {
  const safeName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${safeName || "Meu"}-Curriculo.pdf`;
};
