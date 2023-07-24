import { Request } from 'express';

import { ResultValidator } from './ResultValidator';

const validator = (request: Request) => {
  const resultValidator = new ResultValidator(request);
  return resultValidator;
};

export { validator };
