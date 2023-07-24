import { ValidationError } from 'express-validator';

interface IResultValidator {
  getErrors: () => ValidationError[];
  hasErrors: () => boolean;
}

export { IResultValidator };
