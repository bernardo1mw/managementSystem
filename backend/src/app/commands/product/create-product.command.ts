import { Command } from 'src/domain/contracts/command.contract';
import Product from 'src/domain/entities/Product';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';
import { v4 as uuid } from 'uuid';

export class CreateProductCommand implements Command {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: CreateProductCommand.Input,
  ): Promise<CreateProductCommand.Output> {
    const { userId, description, price, stock, images } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const product = new Product({
      uuid: uuid(),
      userId: userId,
      description: description,
      price: price,
      stock: stock,
      images: images.map((file) => file.path),
    });

    await this.productRepository.save(product);
  }
}

export namespace CreateProductCommand {
  export type Input = {
    userId: number;
    description: string;
    price: number;
    stock: number;
    images: Express.Multer.File[];
  };
  export type Output = void;
}
