import { Command } from 'src/domain/contracts/command.contract';
import Product from 'src/domain/entities/Product';
import { ProductNotFoundException } from 'src/domain/exceptions/product-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class DeleteProductCommand implements Command {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: DeleteProductCommand.Input,
  ): Promise<DeleteProductCommand.Output> {
    const { userId, productId } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const product = await this.productRepository.findOneBy({
      id: productId,
      userId: userId,
    });
    if (!product) throw new ProductNotFoundException();

    product.delete();

    await this.productRepository.save(product);
  }
}

export namespace DeleteProductCommand {
  export type Input = {
    userId: number;
    productId: number;
  };
  export type Output = void;
}
