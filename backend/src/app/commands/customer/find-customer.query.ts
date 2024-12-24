import { Query } from 'src/domain/contracts/query.contract';
import { CustomerNotFoundException } from 'src/domain/exceptions/customer-not-found.exception';
import { ProductNotFoundException } from 'src/domain/exceptions/product-not-found.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import CustomerRepository from 'src/domain/repository/customer.repository';
import ProductRepository from 'src/domain/repository/product.repository';
import UserRepository from 'src/domain/repository/user.repository';

export class FindCustomerQuery implements Query {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: FindCustomerQuery.Input): Promise<FindCustomerQuery.Output> {
    const { customerId } = input;

    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    if (!customer) throw new CustomerNotFoundException();

    return {
      id: customer.getState().id,
      businessName: customer.getState().businessName,
      document: customer.getState().document,
      email: customer.getState().email,
      createdAt: customer.getState().createdAt,
      updatedAt: customer.getState().updatedAt,
      deletedAt: customer.getState().deletedAt,
    };
  }
}

export namespace FindCustomerQuery {
  export type Input = {
    customerId: number;
  };
  export type Output = {
    id: number;
    businessName: string;
    document: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}
