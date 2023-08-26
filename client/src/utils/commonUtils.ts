export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getFileNameWithoutExtension = (fileName: string) => {
  const baseName = fileName.split('.').slice(0, -1).join('.');
  return baseName;
};

export const appendQualityToFilename = (
  fileName: string,
  quality: TVideoQuality
) => {
  const baseName = getFileNameWithoutExtension(fileName);

  const extension = fileName.split('.').pop();

  const newFileName = `${baseName}_${quality}p.${extension}`;

  return newFileName;
};
