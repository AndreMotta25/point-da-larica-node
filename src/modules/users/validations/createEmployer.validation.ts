import { body } from 'express-validator';

import { emailIsValid, isCpf } from './utils.validation';
import { verifyRoles } from './verifyRoles.validation';

const createEmployerValidator = [
  body('name')
    .isString()
    .withMessage('O nome deve ser uma string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('O nome deve ter no minimo 3 caracteres')
    .escape(),
  body('cpf')
    .isString()
    .withMessage('O nome deve ser uma string')
    .trim()
    .notEmpty()
    .custom((value: string) => isCpf(value))
    .escape(),
  body('email')
    .custom((value: string) => emailIsValid(value))
    .isEmail()
    .withMessage('Email inválido')
    .escape(),
  verifyRoles('roles'),
];

export { createEmployerValidator };
