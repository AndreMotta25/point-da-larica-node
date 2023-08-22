import { utcDateToLocalDate } from './utcToLocalDate';

const diffInDays = (max: Date, min: Date) => {
  const milliseconds = 1000;
  const seconds = 60;
  const hours = 60;
  const day = 24;

  return Math.ceil(
    Math.abs(
      utcDateToLocalDate(max).getTime() - utcDateToLocalDate(min).getTime()
    ) /
      (milliseconds * seconds * hours * day)
  );
};

export { diffInDays };
