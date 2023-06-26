interface IListOrderByDateResponse {
  id: string;
  full_value: number;
  situation: 'ativo' | 'cancelado';
  isDelivery: boolean;
  code: string;
  final_value: number;
  date_of_sale: Date;
}

export { IListOrderByDateResponse };
