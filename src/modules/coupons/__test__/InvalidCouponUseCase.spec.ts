import AppError from '@errors/AppError';

import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICouponRepository from '../repositories/ICouponRepository';
import { CouponRepositoryInMemory } from '../repositories/in-memory/CouponRepositoryInMemory';
import CreateCouponUseCase from '../useCases/CreateCoupon/CreateCouponUseCase';
import InvalidCouponUseCase from '../useCases/InvalidCoupon/InvalidCouponUseCase';

let createCouponUseCase: CreateCouponUseCase;
let couponRepositoriInMemory: ICouponRepository;
let invalidCouponUseCase: InvalidCouponUseCase;

let date: Date;

describe('Invalidando um cupom', () => {
  beforeEach(() => {
    couponRepositoriInMemory = new CouponRepositoryInMemory();

    createCouponUseCase = new CreateCouponUseCase(
      couponRepositoriInMemory,
      new CodeGenerator()
    );

    invalidCouponUseCase = new InvalidCouponUseCase(couponRepositoriInMemory);

    date = new Date();
    date.setDate(date.getDate() + 1);
  });

  test('Deveria tornar um cupom invalido', async () => {
    const { id } = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });

    await invalidCouponUseCase.execute(id);
    const coupon = await couponRepositoriInMemory.findById(id);

    expect(coupon?.valid).toBe(false);
  });
  test('Deveria ocorrer um erro ao não achar o cupom', async () => {
    await expect(async () => {
      await invalidCouponUseCase.execute('1233423');
    }).rejects.toBeInstanceOf(AppError);
  });
});
