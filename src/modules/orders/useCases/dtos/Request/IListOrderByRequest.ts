export interface IListOrderByRequest {
  date?: string;
  minDate?: string;
  maxDate?: string;
  limit: number;
  page: number;
  isDelivery: boolean;
}
