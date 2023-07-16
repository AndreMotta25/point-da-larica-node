import { param } from 'express-validator';

const verifyUser = () =>
  param('id')
    .trim()
    .notEmpty()
    .withMessage('id do usuario não pode estar vazio')
    .isUUID('4')
    .withMessage('O id deve ser um uuid da versão 4')
    .escape();

export { verifyUser };
