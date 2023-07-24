/**
 *
 * @param date
 * @param locale
 * @returns string
 *
 * Vai retirar a data do formato utc, deixando numa string numa hora local.
 */
type IOptions = {
  locale: Intl.LocalesArgument;
  config: Intl.DateTimeFormatOptions;
};
const utcToLocal = (date: Date, options: IOptions) => {
  const dateString = date.toLocaleString(options.locale, options.config);
  const [fullYear, time] = dateString.split(' ');
  const fullYearIso = fullYear.split('/').reverse().join('-');
  return `${fullYearIso}T${time}`;
};

export { utcToLocal };
