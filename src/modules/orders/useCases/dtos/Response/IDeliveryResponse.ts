interface IDeliveryResponse {
  id: string;
  full_value: number;
  date_of_sale: Date;
  situation: 'ativo' | 'cancelado';
  deliveryInformationId: string;
  discounted_price: number;
  send: boolean;
  address: string;
  code: string;
}

export { IDeliveryResponse };
