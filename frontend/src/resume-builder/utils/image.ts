const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SOURCE_SIZE = 8 * 1024 * 1024;
const MAX_DIMENSION = 720;

export type ImageValidationError = "invalidType" | "tooLarge" | "processing";

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image could not be loaded"));
    };
    image.src = url;
  });

export const optimizeResumePhoto = async (file: File): Promise<string> => {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error("invalidType");
  if (file.size > MAX_SOURCE_SIZE) throw new Error("tooLarge");

  try {
    const image = await loadImage(file);
    const ratio = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * ratio);
    canvas.height = Math.round(image.height * ratio);

    const context = canvas.getContext("2d");
    if (!context) throw new Error("processing");

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch (error) {
    if (error instanceof Error && ["invalidType", "tooLarge"].includes(error.message)) {
      throw error;
    }
    throw new Error("processing");
  }
};
