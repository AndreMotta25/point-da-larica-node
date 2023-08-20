import { toFormatISO } from './toFormatISO';

type IOptions = {
  locale: Intl.LocalesArgument;
  config: Intl.DateTimeFormatOptions;
};

/**
 * Retira a data do formato utc e retorna a data como string no horario local
 * @param {date} date Ex: 2023-04-20T00:00:00Z
 * @param locale
 * @returns {string} Ex: 2023-04-20T21:00:00
 *
 * Vai retirar a data do formato utc, deixando numa string numa hora local.
 */

const utcToLocal = (date: Date, options: IOptions): string => {
  const dateString = date.toLocaleString(options.locale, options.config);
  const [fullYear, time] = dateString.split(' ');
  const fullYearIso = toFormatISO(fullYear);
  return `${fullYearIso}T${time}`;
};

export { utcToLocal };
