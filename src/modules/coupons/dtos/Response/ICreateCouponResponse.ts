interface ICreateCouponResponse {
  id: string;
  code: string;
  amount: number;
  value: number;
  expire_at: Date;
  valid: boolean;
  minimumValue: number;
}

export { ICreateCouponResponse };
