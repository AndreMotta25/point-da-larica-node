import { body } from 'express-validator';

import { verifyOrder } from './verifyOrder.validation';

const additionalPaymentValidator = [
  body('additionalPayment')
    .isFloat({ min: 1 })
    .withMessage('O valor tem que ser maior que 1'),
  verifyOrder(),
];
export { additionalPaymentValidator };
