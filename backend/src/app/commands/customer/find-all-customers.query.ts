import { Query } from 'src/domain/contracts/query.contract';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import CustomerRepository from 'src/domain/repository/customer.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class FindAllCustomersQuery implements Query {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: FindAllCustomersQuery.Input,
  ): Promise<FindAllCustomersQuery.Output> {
    const { userId } = input;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new UserNotFoundException();

    const customers = await this.customerRepository.findAllBy({
      userId: userId,
    });

    return customers.map((customer) => {
      return {
        id: customer.getState().id,
        businessName: customer.getState().businessName,
        document: customer.getState().document,
        email: customer.getState().email,
        createdAt: customer.getState().createdAt,
      };
    });
  }
}

export namespace FindAllCustomersQuery {
  export type Input = {
    userId: number;
  };
  export type Output = {
    id: number;
    businessName: string;
    document: string;
    email: string;
    createdAt: Date;
  }[];
}
