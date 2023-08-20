import { toFormatISO } from './toFormatISO';

/**
 * Recebe uma data no formato utc e devolve ela no horario local só que em utc
 * @param {date} date Ex: 2023-04-20T20:00:00Z
 * @returns {date} Ex: 2023-04-20T17:00:00z
 *
 * Retorna a data no horario local só que em utc
 */

const utcDateToLocalDate = (date: Date): Date => {
  const [data, hours] = date.toLocaleString().split(' ');
  return new Date(`${toFormatISO(data)}T${hours}z`);
};

export { utcDateToLocalDate };
