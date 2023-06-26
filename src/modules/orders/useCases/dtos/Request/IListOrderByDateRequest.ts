export interface IListOrderByDateRequest {
  date?: string;
  minDate?: string;
  maxDate?: string;
  limit: number;
  page: number;
}
