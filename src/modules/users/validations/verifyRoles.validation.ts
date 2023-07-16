import { body } from 'express-validator';

const verifyRoles = (field: string) =>
  body(field)
    .isArray()
    .withMessage('Tem que ser um array de roles')
    .trim()
    .notEmpty()
    .withMessage('Tem que haver ao menos uma role')
    .isUUID('4')
    .withMessage('O id de uma role deve ser um uuid da versão 4')
    .escape();

export { verifyRoles };
