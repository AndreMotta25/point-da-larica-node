import { query } from 'express-validator';

const getAllOrdersValidator = [
  query('limit').optional().isInt({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
];
export { getAllOrdersValidator };
