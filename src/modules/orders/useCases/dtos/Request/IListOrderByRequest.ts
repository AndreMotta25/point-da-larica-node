export interface IListOrderByRequest {
  date?: string;
  minDate?: string;
  maxDate?: string;
  limit: number;
  page: number;
  isDelivery: number | null;
  isSchedule: number | null;
}
