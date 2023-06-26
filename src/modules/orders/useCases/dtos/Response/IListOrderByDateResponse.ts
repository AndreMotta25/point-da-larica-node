interface IListOrderByDateResponse {
  id: string;
  full_value: number;
  situation: 'ativo' | 'cancelado';
  isDelivery: boolean;
  code: string;
  discount_price: number;
  date_of_sale: Date;
}

export { IListOrderByDateResponse };
