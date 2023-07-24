import { param } from 'express-validator';

const verifyOrder = () =>
  param('id')
    .trim()
    .notEmpty()
    .withMessage('id não pode ficar vazio')
    .isUUID('4')
    .withMessage('O id da ordem deve ser do tipo uuid')
    .escape();
export { verifyOrder };
