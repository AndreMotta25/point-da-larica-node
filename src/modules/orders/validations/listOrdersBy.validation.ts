import { query } from 'express-validator';

const listOrdersValidator = [
  query('date')
    .optional()
    .isISO8601({ strictSeparator: true })
    .withMessage('Formato de data invalido'),
  query('minDate')
    .optional()
    .isISO8601({ strictSeparator: true })
    .withMessage('Formato de data invalido'),
  query('maxDate')
    .optional()
    .isISO8601({ strictSeparator: true })
    .withMessage('Formato de data invalido'),
  query('limit').optional().isInt({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
  query('isDelivery')
    .optional()
    .isInt({ min: 0, max: 1 })
    .withMessage('Valor invalido, digite 1 para true e 0 para false'),
  query('isSchedule')
    .optional()
    .isInt({ min: 0, max: 1 })
    .withMessage('Valor invalido, digite 1 para True e 0 para False'),
];
export { listOrdersValidator };
