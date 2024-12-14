import { Query } from 'src/domain/contracts/query.contract';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class FindAllProductsQuery implements Query {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: FindAllProductsQuery.Input,
  ): Promise<FindAllProductsQuery.Output> {
    const { userId } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const products = await this.productsRepository.findAllBy({
      userId: userId,
    });

    return products.map((product) => {
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
    });
  }
}

export namespace FindAllProductsQuery {
  export type Input = {
    userId: number;
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
  }[];
}
