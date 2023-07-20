import 'reflect-metadata';
import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICouponRepository from '../repositories/ICouponRepository';
import { CouponRepositoryInMemory } from '../repositories/in-memory/CouponRepositoryInMemory';
import CreateCouponUseCase from '../useCases/CreateCoupon/CreateCouponUseCase';

let createCouponUseCase: CreateCouponUseCase;
let couponRepositoriInMemory: ICouponRepository;
let date: Date;

describe('Criar um cupom', () => {
  beforeEach(() => {
    const generator = new CodeGenerator();
    couponRepositoriInMemory = new CouponRepositoryInMemory();
    createCouponUseCase = new CreateCouponUseCase(
      couponRepositoriInMemory,
      generator
    );
    date = new Date();
  });

  test('Deveria ser capaz de criar um cupom', async () => {
    const coupon = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });
    expect(coupon).toHaveProperty('id');
    expect(coupon.code).toHaveLength(5);
  });
  test('Deveria ser capaz de criar um cupom já valido', async () => {
    const coupon = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });
    expect(coupon.valid).toBeTruthy();
  });
});
