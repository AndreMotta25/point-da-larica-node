import ErrorField from '@errors/ErrorField';

import Coupon from '../entities/Coupon';
import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICouponRepository from '../repositories/ICouponRepository';
import { CouponRepositoryInMemory } from '../repositories/in-memory/CouponRepositoryInMemory';
import CreateCouponUseCase from '../useCases/CreateCoupon/CreateCouponUseCase';
import ValidCouponUseCase from '../useCases/ValidCoupon/ValidCouponUseCase';

let createCouponUseCase: CreateCouponUseCase;
let couponRepositoriInMemory: ICouponRepository;
let validCouponUseCase: ValidCouponUseCase;

let date: Date;

describe('Criar um cupom', () => {
  beforeEach(() => {
    const generator = new CodeGenerator();
    couponRepositoriInMemory = new CouponRepositoryInMemory();
    createCouponUseCase = new CreateCouponUseCase(
      couponRepositoriInMemory,
      generator
    );
    validCouponUseCase = new ValidCouponUseCase(couponRepositoriInMemory);
    date = new Date();

    date.setDate(date.getDate() + 1);
  });

  test('Deveria retornar um cupom valido', async () => {
    const { code } = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });

    const coupon = await validCouponUseCase.execute(code);

    expect(coupon.valid).toBe(true);
  });
  test('Deveria ocorrer um erro caso o cupom não for achado', async () => {
    await expect(async () => {
      await validCouponUseCase.execute('123234');
    }).rejects.toBeInstanceOf(ErrorField);
  });

  test('Deveria ocorrer um erro caso o cupom ja for invalido', async () => {
    await expect(async () => {
      const coupon = await createCouponUseCase.execute({
        value: 10,
        amount: 2,
        expire_at: date,
        minimumValue: 5,
      });
      coupon.valid = false;

      await couponRepositoriInMemory.create(coupon);

      await validCouponUseCase.execute(coupon.code);
    }).rejects.toBeInstanceOf(ErrorField);
  });

  test('Deveria ocorrer um erro caso o cupom não tiver a quantidade maior que zero ', async () => {
    await expect(async () => {
      const { code } = await createCouponUseCase.execute({
        value: 10,
        amount: 0,
        expire_at: date,
        minimumValue: 5,
      });
      await validCouponUseCase.execute(code);
    }).rejects.toBeInstanceOf(ErrorField);
  });
  test('Deveria ocorrer um erro caso o cupom já tenha expirado ', async () => {
    await expect(async () => {
      const { code } = await createCouponUseCase.execute({
        value: 10,
        amount: 1,
        expire_at: new Date('2023-06-27T00:00:00'),
        minimumValue: 5,
      });
      await validCouponUseCase.execute(code);
    }).rejects.toBeInstanceOf(ErrorField);
  });
});
