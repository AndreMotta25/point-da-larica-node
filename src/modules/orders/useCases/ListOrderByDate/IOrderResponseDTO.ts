interface IOrderResponseDTO {
  id: string;
  full_value: number;
  discount_price: number;
  date_of_sale: Date;
  situation: 'ativo' | 'cancelado';
}

export { IOrderResponseDTO };
