interface IListOrderByResponse {
  id: string;
  full_value: number;
  situation: 'ativo' | 'cancelado';
  isDelivery: boolean;
  code: string;
  final_value: number;
  date_of_sale: Date;
  address: string | null;
  send: boolean | null;
  deliveryInformationId: string | null;
  isSchedule: boolean;
  schedule_date: Date | null;
}

export { IListOrderByResponse };
