export default interface ICouponDTO {
  value: number;
  amount: number;
  expire_at: Date;
  code: string;
  minimumValue: number;
}
