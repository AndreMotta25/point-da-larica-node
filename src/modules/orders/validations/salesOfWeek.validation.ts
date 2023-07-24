import { query } from 'express-validator';

const salesOfWeekValidator = [
  query('minDate')
    .optional()
    .isISO8601({ strictSeparator: true })
    .withMessage('Formato de data invalido'),
  query('maxDate')
    .optional()
    .isISO8601({ strictSeparator: true })
    .withMessage('Formato de data invalido'),
];

export { salesOfWeekValidator };
