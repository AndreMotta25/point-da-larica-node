import { body } from 'express-validator';

import { isCpf } from '@modules/users/validations/utils.validation';

const createCourtesyValidator = [
  body('value')
    .isFloat({ min: 1 })
    .withMessage('O valor da cortesia tem que ser maior que zero')
    .notEmpty()
    .escape(),
  body('client_cpf')
    .custom((value: string) => isCpf(value))
    .escape(),
  body('motivation')
    .isString()
    .withMessage('A motivação deve ser uma string')
    .trim()
    .notEmpty()
    .withMessage('A motivação não pode ficar vazia')
    .escape(),
];
export { createCourtesyValidator };
