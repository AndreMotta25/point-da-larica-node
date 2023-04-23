interface IProductList {
  id: string;
  amount: number;
}

interface IOrderRequestDTO {
  coupon_code?: string;
  itens: IProductList[];
  isDelivery: boolean;
  adress: string;
}

export { IOrderRequestDTO };
