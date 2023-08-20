/**
 *
 * Vai retornar só a primeira parte de uma data
 * @param {date} date Ex: Ex: 2023-04-20T00:00:00Z
 * @returns {string} Ex: 2023-04-20
 *
 */
const dateToString = (date: Date) => {
  const dateNow = date.toISOString().split('T')[0];
  return dateNow;
};

export { dateToString };
