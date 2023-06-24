import { container, inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IUseCourtesyCardRequest } from '@modules/courtesy/dtos/Request/IUseCourtesyCardRequest';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { CreateOrderUseCase } from '@modules/orders/useCases/CreateOrder/CreateOrderUseCase';
import { GetTotalUseCase } from '@modules/orders/useCases/GetTotal/GetTotalUseCase';

@injectable()
class useCourtesyCardUseCase {
  constructor(
    @inject('CourtesyCardRepository')
    private courtesyCardRepository: ICourtesyCardRepository
  ) {}

  async execute(code: string) {
    const courtesyCard =
      await this.courtesyCardRepository.getCourtesyCardByCode(code);
    if (!courtesyCard)
      throw new AppError('O cliente não tem credito na loja!', 400);

    if (courtesyCard.expiresIn < new Date())
      throw new AppError(`A cortesia expirou em ${courtesyCard.expiresIn}`);

    if (courtesyCard.value <= 0) throw new AppError('Sem saldo suficiente');

    return courtesyCard;
    // const createOrderUseCase = container.resolve(CreateOrderUseCase);

    /*
        O courtesy vem para cá para podemos inserir no banco o quanto ficou faltando
    */
    // const order = await createOrderUseCase.execute({
    //   adress,
    //   isDelivery,
    //   itens,
    //   schedule,
    //   coupon_code,
    //   schedule_date,
    //   courtesy: courtesyCard,
    // });
    // if (!order) throw new AppError('Erro ao processar o pagamento');

    // reduz o credito em loja
    // const creditValue = order.full_value - courtesyCard.value;

    // return {
    //   remaining_balance:
    //     order.additionalPayment > 0 ? order.additionalPayment : 0,
    //   finalized: !(order.additionalPayment > 0),
    //   id_order: order.id,
    // };
  }
}

export { useCourtesyCardUseCase };
