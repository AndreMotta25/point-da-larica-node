interface IDeliveriesResponseDTO {
  id: string;
  full_value: number;
  date_of_sale: Date;
  situation: 'ativo' | 'cancelado';
  deliveryInformationId: string;
  discounted_value: number;
  send: boolean;
  address: string;
}

export { IDeliveriesResponseDTO };
