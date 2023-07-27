import { IListOrderByResponse } from './IListOrderByDateResponse';

export type IGetAllOrdersResponse = Omit<
  IListOrderByResponse,
  'send' | 'deliveryInformationId' | 'address'
>;
