interface IItem {
  total: number;
  amount: number;
  name: string;
}

interface IDelivery {
  send: boolean;
  address: string;
}

interface IGetOrderResponse {
  id: string;
  full_value: number;
  final_value: number;
  date_of_sale: Date;
  discount: number;
  situation: 'ativo' | 'cancelado';
  coupon_code: string;
  delivery?: IDelivery;
  itens: IItem[];
  isDelivery: boolean;
  code: string;
  additionalPayment: number;
}

export { IGetOrderResponse, IItem, IDelivery };
