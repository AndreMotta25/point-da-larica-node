import { body } from 'express-validator';

import { verifyUser } from './verifyUser.validation';

const assignPermitionsValidator = [
  body('permissions_id')
    .isArray()
    .withMessage('Deve ser um array de permissões')
    .trim()
    .notEmpty()
    .withMessage('Tem que haver ao menos uma permissão')
    .isUUID('4')
    .withMessage('O id de uma permissão deve ser um uuid da versão 4')
    .escape(),
  verifyUser(),
];

export { assignPermitionsValidator };
