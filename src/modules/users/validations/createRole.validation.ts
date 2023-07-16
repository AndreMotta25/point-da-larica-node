import { body } from 'express-validator';

const createRoleValidator = [
  body('name')
    .isString()
    .withMessage('Deve ser uma string')
    .trim()
    .notEmpty()
    .withMessage('O nome da role não pode estar vazio')
    .escape(),
  body('description')
    .isString()
    .withMessage('Deve ser uma string')
    .trim()
    .notEmpty()
    .withMessage('A descrição não pode ficar vazia')
    .escape(),
  body('permissions')
    .isArray()
    .withMessage('As permissões devem estar em um array'),
];
export { createRoleValidator };
