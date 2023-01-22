import { body } from 'express-validator';

const couponValidade = [
  body('value')
    .isFloat({ min: 1 })
    .withMessage('O valor tem que ser maior ou igual a 1'),
  body('amount')
    .isInt({ min: 1 })
    .withMessage('A quantidade de cupons tem que ser maior que zero.'),
  body('minimumValue').isFloat({ min: 5 }).withMessage('Valor minimo invalido'),
  body('expire_at')
    .custom((value: Date) => {
      if (new Date(value) < new Date()) return false;
      return true;
    })
    .withMessage('A data não pode ser menor que sua hora atual'),
];

export default couponValidade;
