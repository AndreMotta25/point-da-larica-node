import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICouponRepository from '../repositories/ICouponRepository';
import { CouponRepositoryInMemory } from '../repositories/in-memory/CouponRepositoryInMemory';
import CreateCouponUseCase from '../useCases/CreateCoupon/CreateCouponUseCase';
import ListCouponUseCase from '../useCases/ListCoupon/ListCouponUseCase';

let createCouponUseCase: CreateCouponUseCase;
let couponRepositoriInMemory: ICouponRepository;
let listCouponUseCase: ListCouponUseCase;

let date: Date;

describe('Criar um cupom', () => {
  beforeEach(() => {
    const generator = new CodeGenerator();
    couponRepositoriInMemory = new CouponRepositoryInMemory();
    createCouponUseCase = new CreateCouponUseCase(
      couponRepositoriInMemory,
      generator
    );
    listCouponUseCase = new ListCouponUseCase(couponRepositoriInMemory);

    date = new Date();

    date.setDate(date.getDate() + 1);
  });

  test('Deveria retornar todos os cupons', async () => {
    const coupon1 = await createCouponUseCase.execute({
      value: 10,
      amount: 2,
      expire_at: date,
      minimumValue: 5,
    });
    const coupon2 = await createCouponUseCase.execute({
      value: 2,
      amount: 1,
      expire_at: date,
      minimumValue: 1,
    });

    const coupons = await listCouponUseCase.execute();

    expect(coupons).toHaveLength(2);
  });
});
