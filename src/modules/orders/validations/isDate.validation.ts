import { ExpressValidator } from 'express-validator';

const { body } = new ExpressValidator({
  hasTime: (value: string) => {
    const matchSearch = value.match(/:/g)?.length;
    if (
      !value.includes('T') ||
      !(matchSearch && matchSearch > 0 && matchSearch < 3)
    )
      throw new Error(
        'Data com formato inválido. O formato deve ser YYYY-MM-DDT00:00:00'
      );
    return true;
  },
});

export { body };
