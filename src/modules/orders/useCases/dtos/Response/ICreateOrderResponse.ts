interface ICreateOrderResponse {
  remaining_balance: number;
  finalized: boolean;
  id_order: string;
  code: string;
}

export { ICreateOrderResponse };
