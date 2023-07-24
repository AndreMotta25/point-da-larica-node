import { body } from 'express-validator';

const productValidator = [
  body('value')
    .isFloat({ min: 1 })
    .withMessage('O valor tem que ser maior ou igual a 1'),
  body('name')
    .isString()
    .withMessage('Nome deve ser uma string')
    .trim()
    .notEmpty()
    .withMessage('O nome do produto não pode ficar vazio'),
  body('description')
    .isString()
    .withMessage('Descrição deve ser uma string')
    .trim()
    .notEmpty()
    .withMessage('A descrição do produto não pode ficar vazio'),
];

export { productValidator };
