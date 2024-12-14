import { Command } from 'src/domain/contracts/command.contract';
import Product from 'src/domain/entities/Product';
import { ProductNotFoundException } from 'src/domain/exceptions/product-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class UpdateProductCommand implements Command {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: Partial<UpdateProductCommand.Input>,
  ): Promise<UpdateProductCommand.Output> {
    const { userId, productId, description, price, stock, images } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const product = await this.productRepository.findOneBy({
      id: productId,
      userId: userId,
    });
    if (!product) throw new ProductNotFoundException();

    product.update({
      description: description,
      price: price,
      stock: stock,
      images: images,
    });

    await this.productRepository.save(product);
  }
}

export namespace UpdateProductCommand {
  export type Input = {
    userId: number;
    productId: number;
    description: string;
    price: number;
    stock: number;
    images: string[];
  };
  export type Output = void;
}
