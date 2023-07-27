import { param } from 'express-validator';

const getCourtesyValidator = [
  param('code')
    .isString()
    .withMessage('Codigo tem que ser uma string')
    .trim()
    .notEmpty()
    .withMessage('O codigo não pode ficar vazio'),
];
export { getCourtesyValidator };
