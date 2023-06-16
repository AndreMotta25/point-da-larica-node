const convertTime = {
  toMin(min: number) {
    return 60 * min;
  },
  toHour(hour: number) {
    return 60 * (hour * 60);
  },
  toDays(days: number) {
    return 86400 * days;
  },
};

export { convertTime };
