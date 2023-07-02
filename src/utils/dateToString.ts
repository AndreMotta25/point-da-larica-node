const dateToString = (date: Date) => {
  const dateNow = date.toISOString().split('T')[0];
  return dateNow;
};

export { dateToString };
