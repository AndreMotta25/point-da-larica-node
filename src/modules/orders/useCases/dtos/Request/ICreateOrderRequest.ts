export interface IProductList {
  id: string;
  amount: number;
}
export interface ICreateOrderRequest {
  coupon_code?: string;
  itens: IProductList[];
  isDelivery: boolean;
  address: string;
  id?: string;
  courtesy_code?: string;
  isSchedule: boolean;
  schedule_date?: Date;
  cpf_client?: string;
}
