import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import ListCouponUseCase from './ListCouponUseCase';

class ListCouponController {
  async handler(request: Request, response: Response): Promise<Response> {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const listCouponUseCase = container.resolve(ListCouponUseCase);

    const coupons = await listCouponUseCase.execute();

    return response.status(200).json(coupons);
  }
}
export default ListCouponController;
