import { body, param } from 'express-validator';

const resetPasswordValidate = [
  body('new_password')
    .trim()
    .notEmpty()
    .isString()
    .isStrongPassword({
      minLength: 5,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      'A senha deve conter no minimo 5 caracteres, 1 caracter maiusculo, um numero e um simbolo especial'
    )
    .escape(),
  param('token').trim().isJWT().withMessage('Token jwt invalido').escape(),
];

export { resetPasswordValidate };
