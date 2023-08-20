/**
 *
 * Vai retirar a "data" do formato utc, deixando numa string no horario local.
 * @param {string} date Ex: 2023/04/20
 * @returns {string} Ex: 2023/04/20 to 2023-04-20
 *
 */
const toFormatISO = (date: string): string => {
  return date.split('/').reverse().join('-');
};

export { toFormatISO };
