export const readFile = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", async () => {
      const buffer = reader.result;
      resolve(buffer as string);
    });
    reader.readAsDataURL(file);
  });
};

export const calculateHU = (
  pixelValue: number,
  rescaleSlope: number,
  rescaleIntercept: number
) => pixelValue * rescaleSlope + rescaleIntercept;

export const applyWindowLevel = (
  pixelValue: number,
  windowCenter: number,
  windowWidth: number
) => {
  let minValue = windowCenter - windowWidth / 2;
  let maxValue = windowCenter + windowWidth / 2;
  return Math.min(Math.max(pixelValue, minValue), maxValue);
};
