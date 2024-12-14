import Product from 'src/domain/entities/Product';
import ProductRepository from 'src/domain/repository/product.repository';
import { DataSource } from 'typeorm';
import { ProductEntity } from '../mapping/product.entity';

export class ProductRepositoryTypeORMAdapter implements ProductRepository {
  constructor(private readonly connection: DataSource) {}

  async save(product: Product): Promise<void> {
    const repository = this.connection.getRepository(ProductEntity);
    const productEntity = repository.create({
      id: product.getState().id,
      uuid: product.getState().uuid,
      userId: product.getState().userId,
      description: product.getState().description,
      price: product.getState().price,
      stock: product.getState().stock,
      images: product.getState().images,
      createdAt: product.getState().createdAt,
      updatedAt: product.getState().updatedAt,
      deletedAt: product.getState().deletedAt,
    });
    await repository.save(productEntity, { reload: false });
  }

  async findAllBy(
    input: Partial<{
      userId: number;
    }>,
  ): Promise<Product[]> {
    const repository = this.connection.getRepository(ProductEntity);
    const query = repository.createQueryBuilder('products');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`products.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const products = await query.getMany();
    return products.map((product) => {
      return new Product({
        id: product.id,
        uuid: product.uuid,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
      });
    });
  }
  async findOneBy(
    input: Partial<{ id: number; uuid: string }>,
  ): Promise<Product | null> {
    const repository = this.connection.getRepository(ProductEntity);
    const query = repository.createQueryBuilder('products');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`products.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const product = await query.getOne();

    if (!product) return null;

    return new Product({
      id: product.id,
      uuid: product.uuid,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    });
  }
}
