import { Command } from 'src/domain/contracts/command.contract';
import { OrderNotFoundException } from 'src/domain/exceptions/order-not-found.exception';
import OrderRepository from 'src/domain/repository/order.repository';

export class DeleteOrderCommand implements Command {
  constructor(private readonly ordersRepository: OrderRepository) {}

  async execute(
    input: DeleteOrderCommand.Input,
  ): Promise<DeleteOrderCommand.Output> {
    const { customerId, orderId } = input;

    const order = await this.ordersRepository.findOneBy({
      customerId,
      id: orderId,
    });

    if (!order) throw new OrderNotFoundException();

    order.delete();

    await this.ordersRepository.save(order);
  }
}

export namespace DeleteOrderCommand {
  export type Input = {
    customerId: number;
    orderId: number;
  };
  export type Output = void;
}
