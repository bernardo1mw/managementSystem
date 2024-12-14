import { Query } from 'src/domain/contracts/query.contract';
import { ProductNotFoundException } from 'src/domain/exceptions/product-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class GetProductQuery implements Query {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: GetProductQuery.Input): Promise<GetProductQuery.Output> {
    const { userId, productId } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const product = await this.productsRepository.findOneBy({
      userId: userId,
      id: productId,
    });

    if (!product) throw new ProductNotFoundException();

    return {
      id: product.getState().id,
      uuid: product.getState().uuid,
      description: product.getState().description,
      price: product.getState().price,
      stock: product.getState().stock,
      images: product.getState().images,
      createdAt: product.getState().createdAt,
      updatedAt: product.getState().updatedAt,
      deletedAt: product.getState().deletedAt,
    };
  }
}

export namespace GetProductQuery {
  export type Input = {
    userId: number;
    productId: number;
  };
  export type Output = {
    id: number;
    uuid: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}
