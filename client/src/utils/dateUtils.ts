export const decimalToTimeString = (decimal: number): string => {
  const minutes = Math.floor(decimal / 60);
  const seconds = Math.ceil(decimal % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes.toString().padStart(2, '0')}:${seconds}`;
};

export const dateStringToFormattedString = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
};
