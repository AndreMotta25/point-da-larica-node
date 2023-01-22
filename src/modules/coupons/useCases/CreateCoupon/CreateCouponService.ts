import { inject, injectable } from 'tsyringe';

import ICodeGenerator from '../../interfaces/ICodeGenerator';
import ICouponRepository from '../../repositories/ICouponRepository';

interface ICouponRequest {
  value: number;
  amount: number;
  expire_at: Date;
  minimumValue: number;
}

@injectable()
class CreateCouponService {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository,
    @inject('CodeGenerator') private generator: ICodeGenerator
  ) {}

  async execute({
    value,
    amount,
    expire_at,
    minimumValue,
  }: ICouponRequest): Promise<void> {
    const code = this.generator.generateCode(5);
    await this.repository.create({
      value,
      amount,
      expire_at,
      code,
      minimumValue,
    });
  }
}
export default CreateCouponService;
