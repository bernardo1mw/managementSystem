import { Query } from 'src/domain/contracts/query.contract';
import { CustomerNotFoundException } from 'src/domain/exceptions/customer-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import CustomerRepository from 'src/domain/repository/customer.repository';
import OrderRepository from 'src/domain/repository/order.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class FindAllOrdersQuery implements Query {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: FindAllOrdersQuery.Input,
  ): Promise<FindAllOrdersQuery.Output> {
    const { userId } = input;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();

    const customers = await this.customerRepository.findAllBy({
      userId,
    });

    if (!customers) throw new CustomerNotFoundException();

    const orders = customers
      .map((customer) => {
        return customer.getState().orders.map((order) => {
          return {
            id: order.getState().id,
            uuid: order.getState().uuid,
            customerName: customer.getState().businessName,
            total: order.getState().total,
            createdAt: order.getState().createdAt,
            deletedAt: order.getState().deletedAt,
          };
        });
      })
      .flat();

    return orders;
  }
}

export namespace FindAllOrdersQuery {
  export type Input = {
    userId: number;
  };
  export type Output = {
    id: number;
    uuid: string;
    customerName: string;
    total: number;
    createdAt: Date;
    deletedAt: Date | null;
  }[];
}
