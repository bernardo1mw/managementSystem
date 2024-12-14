import { Query } from 'src/domain/contracts/query.contract';
import { OrderNotFoundException } from 'src/domain/exceptions/order-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import OrderRepository from 'src/domain/repository/order.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class GetOrderQuery implements Query {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: GetOrderQuery.Input): Promise<GetOrderQuery.Output> {
    const { userId, orderId } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const order = await this.orderRepository.findOneBy({
      id: orderId,
    });

    if (!order) throw new OrderNotFoundException();

    return {
      id: order.getState().id,
      customerId: order.getState().customerId,
      total: order.getState().total,
      createdAt: order.getState().createdAt,
      items: order.getState().items.map((item) => {
        return {
          productId: item.getState().productId,
          productName: item.getState().productName,
          quantity: item.getState().quantity,
          unitPrice: item.getState().unitPrice,
        };
      }),
    };
  }
}

export namespace GetOrderQuery {
  export type Input = {
    userId: number;
    orderId: number;
  };
  export type Output = {
    id: number;
    customerId: number;
    total: number;
    createdAt: Date;
    items: {
      productName: string;
      productId: number;
      quantity: number;
      unitPrice: number;
    }[];
  };
}
