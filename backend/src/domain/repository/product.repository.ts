import Product from '../entities/Product';

export default interface ProductRepository {
  save(product: Product): Promise<void>;
  findAllBy(
    input: Partial<{
      userId: number;
    }>,
  ): Promise<Product[]>;
  findOneBy(
    input: Partial<{
      id: number;
      uuid: string;
      userId: number;
    }>,
  ): Promise<Product | null>;
}
