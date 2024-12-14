import { Command } from 'src/domain/contracts/command.contract';
import Order from 'src/domain/entities/Order';
import OrderRepository from 'src/domain/repository/order.repository';
import ProductRepository from 'src/domain/repository/product.repository';
import { v4 as uuid } from 'uuid';

export class CreateOrderCommand implements Command {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    input: CreateOrderCommand.Input,
  ): Promise<CreateOrderCommand.Output> {
    const { customerId, items } = input;

    const order = new Order({
      uuid: uuid(),
      customerId: customerId,
    });
    if (items) {
      for (const item of items) {
        const product = await this.productRepository.findOneBy({
          id: item.productId,
        });
        if (!product) continue;
        order.addItem(product, item.quantity);
      }
    }

    await this.orderRepository.save(order);
  }
}

export namespace CreateOrderCommand {
  export type Input = {
    customerId: number;
    items: {
      productId: number;
      quantity: number;
    }[];
  };
  export type Output = void;
}
