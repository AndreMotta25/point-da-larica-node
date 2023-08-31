import { ProductType } from '@modules/orders/entities/Product';

interface ICreateProductRequest {
  value: number;
  name: string;
  description: string;
  image: string;
  id?: string;
  type: ProductType;
}
export { ICreateProductRequest };
