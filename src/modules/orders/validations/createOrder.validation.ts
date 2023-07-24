import { body } from './isDate.validation';

const createOrderValidator = [
  body('coupon_code')
    .optional()
    .isString()
    .withMessage('O codigo do cupom deve ser uma string')
    .trim()
    .escape(),
  body('courtesy_code')
    .optional()
    .isString()
    .withMessage('O codigo do cupom deve ser uma string')
    .trim()
    .escape(),
  body('isDelivery')
    .isBoolean()
    .withMessage('A entrega deve ser armazenada como verdadeiro ou falso'),
  body('address')
    .isString()
    .withMessage('O endereço deve ser uma string')
    .optional()
    .trim()
    .escape(),
  body('itens.*.amount')
    .isInt({ min: 1, max: 999 })
    .withMessage('A Quantidade de cada item tem que ser no minimo 1'),
  body('itens.*.id').isUUID().withMessage('O id do produto deve ser um guid'),
];
export { createOrderValidator };
