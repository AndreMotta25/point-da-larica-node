import { body } from 'express-validator';

import { emailIsValid } from './utils.validation';

const forgetPasswordValidade = [
  body('email')
    .custom((value: string) => emailIsValid(value))
    .isEmail()
    .withMessage('Email inválido'),
];
export { forgetPasswordValidade };
