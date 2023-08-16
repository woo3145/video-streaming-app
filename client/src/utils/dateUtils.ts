export const decimalToTimeString = (decimal: number): string => {
  const minutes = Math.floor(decimal / 60);
  const seconds = Math.ceil(decimal % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes.toString().padStart(2, '0')}:${seconds}`;
};
