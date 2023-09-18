/**
 * Converts a date to a string in the format DD/MM/YYYY
 * @returns The current date in the format DD/MM/YYYY
 */
export const dateToSlashDate = (): string => {
  const date = new Date();
  return `${addZero(date.getDate())}/${addZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
};

/**
 * Add a zero before a number if it's less than 10
 * @param n - The number to add a zero to
 * @returns The number with a zero before it if it's less than 10
 */
const addZero = (n: number): string => {
  return n < 10 ? `0${n}` : `${n}`;
};
