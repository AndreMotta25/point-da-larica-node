import { body } from 'express-validator';

import { emailIsValid } from './utils.validation';

const authenticateUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Email Invalido')
    .custom((value: string) => emailIsValid(value))
    .escape(),
  body('password')
    .isString()
    .withMessage('A senha dever ser uma string')
    .trim()
    .notEmpty()
    .withMessage('A senha não pode ficar em branco')
    .escape(),
];
export { authenticateUserValidator };
