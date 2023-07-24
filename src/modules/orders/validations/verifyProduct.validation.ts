import { param } from 'express-validator';

const verifyProduct = () =>
  param('id')
    .trim()
    .notEmpty()
    .withMessage('id não pode ficar vazio')
    .isUUID('4')
    .withMessage('O id do produto deve ser do tipo uuid')
    .escape();
export { verifyProduct };
