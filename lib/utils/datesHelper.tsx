export const daysBetween = (startingDate: Date, lastestDate?: Date) => {
  if (!lastestDate) return 0;

  const difference = lastestDate.getTime() - startingDate.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

export const isInTheCurrentYear = (date: Date) => {
  return new Date().getFullYear() === date.getFullYear();
};

export const monthsBetween = (startingDate: Date, lastestDate?: Date) => {
  if (!lastestDate) return 0;
  let months;
  months = (lastestDate.getFullYear() - startingDate.getFullYear()) * 12;
  months -= startingDate.getMonth();
  months += lastestDate.getMonth();
  return months <= 0 ? 0 : months;
};

export const getNowDate = () => {
  const now = new Date();
  return now.toLocaleDateString();
};
