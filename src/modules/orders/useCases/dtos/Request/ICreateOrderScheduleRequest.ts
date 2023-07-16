import { IProductList } from './ICreateOrderRequest';

export interface ICreateOrderScheduleRequest {
  coupon_code?: string;
  itens: IProductList[];
  isDelivery: boolean;
  address: string;
  id?: string;
  courtesy_code?: string;
  schedule_date?: Date;
}
