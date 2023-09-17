export const dateToSlashDate = (): string => {
  const date = new Date();
  return `${addZero(date.getDate())}/${addZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
};

const addZero = (n: number): string => {
  return n < 10 ? `0${n}` : `${n}`;
};
