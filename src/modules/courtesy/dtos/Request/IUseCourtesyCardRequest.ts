import { IOrderRequestDTO } from '@modules/orders/useCases/CreateOrder/CreateOrderUseCase';

interface IUseCourtesyCardRequest extends IOrderRequestDTO {
  cpf: string;
}
export { IUseCourtesyCardRequest };
