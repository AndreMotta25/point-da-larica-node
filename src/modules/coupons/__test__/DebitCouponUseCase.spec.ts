import AppError from '@errors/AppError';

import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICouponRepository from '../repositories/ICouponRepository';
import { CouponRepositoryInMemory } from '../repositories/in-memory/CouponRepositoryInMemory';
import CreateCouponUseCase from '../useCases/CreateCoupon/CreateCouponUseCase';
import DebitCouponUseCase from '../useCases/DebitCoupon/DebitCouponUseCase';

let debitCouponUseCase: DebitCouponUseCase;
let createCouponUseCase: CreateCouponUseCase;

let couponRepositoriInMemory: ICouponRepository;
let date: Date;

describe('Debitar um cupom', () => {
  beforeEach(() => {
    couponRepositoriInMemory = new CouponRepositoryInMemory();

    createCouponUseCase = new CreateCouponUseCase(
      couponRepositoriInMemory,
      new CodeGenerator()
    );

    debitCouponUseCase = new DebitCouponUseCase(couponRepositoriInMemory);
    date = new Date();
    date.setDate(date.getDate() + 1);
  });

  test('Deveria ser possivel debitar um cupom', async () => {
    const coupon = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });

    await debitCouponUseCase.execute(coupon.code);

    const couponDebited = await couponRepositoriInMemory.findById(coupon.id);

    expect(couponDebited?.amount).toBe(1);
  });

  test('Deveria tornar invalido o cupom que tivesse a quantidade menor ou igual a zero ', async () => {
    const { code } = await createCouponUseCase.execute({
      value: 10,
      amount: 1,
      expire_at: date,
      minimumValue: 5,
    });

    await debitCouponUseCase.execute(code);
    const coupon = await couponRepositoriInMemory.getCoupon(code);

    expect(coupon).not.toBeNull();
    expect(coupon?.valid).toBeFalsy();
  });

  test('Deveria ocorrer um erro caso a quantidade de cupom for inferior ou igual a zero', async () => {
    await expect(async () => {
      const { code } = await createCouponUseCase.execute({
        value: 10,
        amount: 0,
        expire_at: date,
        minimumValue: 5,
      });

      await debitCouponUseCase.execute(code);
    }).rejects.toBeInstanceOf(AppError);
  });
  test('Deveria ocorrer um erro caso a data do cupom esteja expirada', async () => {
    await expect(async () => {
      const { code } = await createCouponUseCase.execute({
        value: 10,
        amount: 1,
        expire_at: new Date('2023-06-27T00:00:00'),
        minimumValue: 5,
      });

      await debitCouponUseCase.execute(code);
    }).rejects.toBeInstanceOf(AppError);
  });
  test('Deveria ocorrer um erro caso o cupom esteja invalido', async () => {
    await expect(async () => {
      const coupon = await createCouponUseCase.execute({
        value: 10,
        amount: 1,
        expire_at: date,
        minimumValue: 5,
      });
      coupon.valid = false;

      await couponRepositoriInMemory.create(coupon);

      await debitCouponUseCase.execute(coupon.code);
    }).rejects.toBeInstanceOf(AppError);
  });
});
