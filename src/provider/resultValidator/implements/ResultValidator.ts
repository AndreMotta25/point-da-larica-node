import { Request } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

import { IResultValidator } from '../IResultValidator';

class ResultValidator implements IResultValidator {
  private result: Result<ValidationError>;

  constructor(request: Request) {
    this.result = validationResult(request);
  }

  getErrors() {
    return this.result.array();
  }

  hasErrors() {
    if (!this.result.isEmpty()) return true;
    return false;
  }
}

export { ResultValidator };
