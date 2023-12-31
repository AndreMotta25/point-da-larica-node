import { ITransaction } from 'src/database/transactions/Transaction/ITransaction';
import { container, inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import DebitCouponUseCase from '@modules/coupons/useCases/DebitCoupon/DebitCouponUseCase';
import ValidCouponUseCase from '@modules/coupons/useCases/ValidCoupon/ValidCouponUseCase';
import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { UseCourtesyCardUseCase } from '@modules/courtesy/useCases/UseCourtesyCard/UseCourtesyCardUseCase';
import { Product } from '@modules/orders/entities/Product';
import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';
import { IOrderListRepository } from '@modules/orders/repositories/IOrderListRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

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
    private courtesyCardRepository: ICourtesyCardRepository,
    @inject('EmployerRepository')
    private repositoryEmployer: IEmployerRepository
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
    address,
    isSchedule,
    schedule_date,
    courtesy_code,
    cpf_client,
    employer,
  }: ICreateOrderRequest): Promise<ICreateOrderResponse | undefined> {
    const employerExists = await this.repositoryEmployer.findById(employer);

    if (!employerExists) {
      throw new AppError('Empregado não achado', 404);
    }

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

        const coupon = await validCouponUseCase.execute({
          code: coupon_code,
          value: total,
        });

        final_value = total - coupon.value;
        coupon_value = coupon.value;

        await debitCouponUseCase.execute(coupon.code);
      }
      // verifica se o comprador tem credito na loja
      let cortesy: CourtesyCard | null = null;

      if (courtesy_code && cpf_client) {
        const courtesyCardUseCase = container.resolve(UseCourtesyCardUseCase);
        cortesy = await courtesyCardUseCase.execute({
          code: courtesy_code,
          cpf_client,
        });

        if (cortesy.value < final_value) {
          additionalPayment = final_value - cortesy.value;
          total = cortesy.value;
          final_value = cortesy.value;
          cortesy.value = 0;
        } else {
          cortesy.value -= final_value;
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
        isSchedule,
        schedule_date,
        additionalPayment: 0,
        employer: employerExists,
      });

      if (cortesy) {
        order.courtesy = cortesy;
        await this.repository.create(order);
      }

      if (isDelivery) {
        if (!address) throw new AppError('Faltou o endereço de entrega', 400);
        await this.repositoryDelivery.create({ address, order });
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
        remaining_balance:
          additionalPayment > 0 ? Number(additionalPayment.toPrecision(3)) : 0,
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
