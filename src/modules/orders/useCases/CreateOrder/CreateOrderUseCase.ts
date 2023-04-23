import { container, inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import DebitCouponService from '@modules/coupons/useCases/DebitCoupon/DebitCouponService';
import ValidCouponService from '@modules/coupons/useCases/ValidCoupon/ValidCouponService';
import { Product } from '@modules/orders/entities/Product';
import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';
import { IOrderListRepository } from '@modules/orders/repositories/IOrderListRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { IOrderRequestDTO } from './IOrderRequestDTO';

@injectable()
class CreateOrderUseCase {
  private readonly repositoryProduct: IProductRepository;
  private readonly repository: IOrderRepository;
  private readonly repositoryOrderList: IOrderListRepository;
  private readonly repositoryDelivery: IDeliveryRepository;

  constructor(
    @inject('ProductRepository') repositoryProduct: IProductRepository,
    @inject('OrderListRepository') repositoryOrderList: IOrderListRepository,
    @inject('OrderRepository') repository: IOrderRepository,
    @inject('DeliveryRepository') repositoryDelivery: IDeliveryRepository
  ) {
    this.repositoryProduct = repositoryProduct;
    this.repository = repository;
    this.repositoryOrderList = repositoryOrderList;
    this.repositoryDelivery = repositoryDelivery;
  }

  async execute({ coupon_code, itens, isDelivery, adress }: IOrderRequestDTO) {
    const valuesPromise = itens.map(async (product) => {
      // deixar isso pro express-validator depois
      if (!product.id) throw new AppError('Produto não informado', 400);
      if (product.amount <= 0)
        throw new AppError(
          'A quantidade de itens não pode ser menor ou igual a zero',
          400
        );

      const productExist = await this.repositoryProduct.findById(product.id);
      if (!productExist) throw new AppError('Produto não existe', 404);
      return productExist.value * product.amount;
    });
    const total = await this.calculateTotal(valuesPromise);

    if (total <= 0)
      throw new AppError('O total não deve ser menor do que zero', 400);

    let discount = 0;
    let coupon_value = 0;

    // verifica  se o cupom existe
    if (coupon_code) {
      const validCouponUseCase = container.resolve(ValidCouponService);
      const debitCouponUseCase = container.resolve(DebitCouponService);
      const coupon = await validCouponUseCase.execute(coupon_code);

      if (!(total >= coupon.minimumValue))
        throw new AppError(
          'A compra não alcançou o valor minimo para usar o cupom',
          422
        );

      discount = total - coupon.value;
      coupon_value = coupon.value;

      await debitCouponUseCase.execute(coupon.code);
    }

    const order = await this.repository.create({
      full_value: total,
      discount_value: coupon_value,
      discounted_value: discount,
      coupon_code,
      code: 'asdsadsad',
      isDelivery,
    });

    if (isDelivery) {
      if (!adress) throw new AppError('Faltou o endereço de entrega', 400);

      await this.repositoryDelivery.create({ adress, order });
    }

    // cadastrando os pedidos itens
    itens.forEach(async (item) => {
      const product = (await this.repositoryProduct.findById(
        item.id
      )) as Product;

      await this.repositoryOrderList.create({
        order,
        product,
        amount: item.amount,
        total: product.value * item.amount,
      });
    });
  }
  async calculateTotal(values: Promise<number>[]) {
    const value = await (
      await Promise.all(values)
    ).reduce((prev: number, current: number) => prev + current, 0);
    return value;
  }
}

export { CreateOrderUseCase };
