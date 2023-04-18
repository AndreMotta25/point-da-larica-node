interface IOrderResponseDTO {
  id: string;
  full_value: number;
  discounted_value: number;
  date_of_sale: Date;
  situation: 'ativo' | 'cancelado';
}

export { IOrderResponseDTO };
