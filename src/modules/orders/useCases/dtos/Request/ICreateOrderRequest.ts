export interface IProductList {
  id: string;
  amount: number;
}
export interface ICreateOrderRequest {
  coupon_code?: string;
  itens: IProductList[];
  isDelivery: boolean;
  adress: string;
  id?: string;
  courtesy_code?: string;
  isSchedule: boolean;
  schedule_date?: Date;
}
