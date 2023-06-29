import { ITransaction } from 'src/database/transactions/Transaction/ITransaction';
import { container, inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import DebitCouponUseCase from '@modules/coupons/useCases/DebitCoupon/DebitCouponUseCase';
import ValidCouponUseCase from '@modules/coupons/useCases/ValidCoupon/ValidCouponUseCase';
import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { useCourtesyCardUseCase } from '@modules/courtesy/useCases/UseCourtesyCard/useCourtesyCardUseCase';
import { Product } from '@modules/orders/entities/Product';
import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';
import { IOrderListRepository } from '@modules/orders/repositories/IOrderListRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import {
  ICreateOrderRequest,
  IProductList,
} from '../dtos/Request/ICreateOrderRequest';
import { ICreateOrderResponse } from '../dtos/Response/ICreateOrderResponse';
import { GetTotalUseCase } from '../GetTotal/GetTotalUseCase';

@injectable()
class CreateOrderUseCase {
  private readonly repositoryProduct: IProductRepository;
  private readonly repository: IOrderRepository;
  private readonly repositoryOrderList: IOrderListRepository;
  private readonly repositoryDelivery: IDeliveryRepository;
  private readonly codeGenerator: ICodeGenerator;

  constructor(
    @inject('Transaction') private transaction: ITransaction,
    @inject('ProductRepository') repositoryProduct: IProductRepository,
    @inject('OrderListRepository') repositoryOrderList: IOrderListRepository,
    @inject('OrderRepository') repository: IOrderRepository,
    @inject('DeliveryRepository') repositoryDelivery: IDeliveryRepository,
    @inject('CodeGenerator') codeGenerator: ICodeGenerator,
    @inject('CourtesyCardRepository')
    private courtesyCardRepository: ICourtesyCardRepository
  ) {
    this.repositoryProduct = repositoryProduct;
    this.repository = repository;
    this.repositoryOrderList = repositoryOrderList;
    this.repositoryDelivery = repositoryDelivery;
    this.codeGenerator = codeGenerator;
  }

  async execute({
    coupon_code,
    itens,
    isDelivery,
    adress,
    schedule,
    schedule_date,
    courtesy_code,
  }: ICreateOrderRequest): Promise<ICreateOrderResponse | undefined> {
    const getTotalUseCase = container.resolve(GetTotalUseCase);

    let total = await getTotalUseCase.execute(itens);

    if (total <= 0)
      throw new AppError('O total não deve ser menor do que zero', 400);

    let final_value = total;
    let coupon_value = 0;
    let additionalPayment = 0;

    await this.transaction.startTransaction();
    try {
      // verifica  se o cupom existe
      if (coupon_code) {
        const validCouponUseCase = container.resolve(ValidCouponUseCase);
        const debitCouponUseCase = container.resolve(DebitCouponUseCase);
        const coupon = await validCouponUseCase.execute(coupon_code);

        if (!(total >= coupon.minimumValue))
          throw new AppError(
            'A compra não alcançou o valor minimo para usar o cupom',
            422
          );

        final_value = total - coupon.value;
        coupon_value = coupon.value;

        await debitCouponUseCase.execute(coupon.code);
      }
      // verifica se o comprador tem credito na loja
      let cortesy: CourtesyCard | null = null;

      if (courtesy_code) {
        const courtesyCardUseCase = container.resolve(useCourtesyCardUseCase);
        cortesy = await courtesyCardUseCase.execute(courtesy_code);

        if (cortesy.value < total) {
          additionalPayment = total - cortesy.value;
          total = cortesy.value;
          cortesy.value = 0;
        } else {
          cortesy.value = total - cortesy.value;
        }
        // salvar as modificaçoes feitas no courtesy
        await this.courtesyCardRepository.create(cortesy);
      }

      const order = await this.repository.create({
        full_value: total,
        discount: coupon_value,
        final_value,
        coupon_code,
        code: this.codeGenerator.generateCode(4),
        isDelivery,
        schedule,
        schedule_date,
        additionalPayment: 0,
      });

      if (cortesy) {
        order.courtesy = cortesy;
        await this.repository.create(order);
      }

      if (isDelivery) {
        if (!adress) throw new AppError('Faltou o endereço de entrega', 400);
        await this.repositoryDelivery.create({ adress, order });
      }

      this.clearRepeatedItens(itens).forEach(async (item) => {
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

      await this.transaction.commitTransaction();

      return {
        remaining_balance: additionalPayment > 0 ? additionalPayment : 0,
        finalized: !(additionalPayment > 0),
        id_order: order.id,
        code: order.code,
      };
    } catch (error) {
      await this.transaction.rollBackTransaction();
      throw error;
    }
  }

  clearRepeatedItens(itens: IProductList[]) {
    const itensfiltered = itens.reduce(
      (acc: IProductList[], product: IProductList) => {
        const elem = acc?.find(
          (productAcc: IProductList) => productAcc.id === product.id
        );
        if (!elem) {
          return [...acc, { id: product.id, amount: product.amount }];
        }
        elem.amount += product.amount;
        return acc;
      },
      []
    );
    return itensfiltered;
  }
}

export { CreateOrderUseCase };
