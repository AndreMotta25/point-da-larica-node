import { query, param } from 'express-validator';

import { isCpf } from '../../users/validations/utils.validation';

const getCourtesyValidator = [
  query('code')
    .isString()
    .withMessage('Codigo tem que ser uma string')
    .trim()
    .notEmpty()
    .withMessage('O codigo não pode ficar vazio')
    .escape(),
  query('cpf')
    .custom((value: string) => isCpf(value))
    .escape(),
];
export { getCourtesyValidator };
