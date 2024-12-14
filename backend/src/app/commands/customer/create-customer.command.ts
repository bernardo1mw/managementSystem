import { Command } from 'src/domain/contracts/command.contract';
import Customer from 'src/domain/entities/Customer';
import Email from 'src/domain/entities/Email';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import CustomerRepository from 'src/domain/repository/customer.repository';
import UserRepository from 'src/domain/repository/user.repository';
import { v4 as uuid } from 'uuid';

export class CreateCustomerCommand implements Command {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: CreateCustomer.Input): Promise<CreateCustomer.Output> {
    const { userId, businessName, document, email } = input;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();
    const customer = new Customer({
      uuid: uuid(),
      userId: userId,
      businessName: businessName,
      document: document,
      email: new Email(email),
    });
    await this.customerRepository.save(customer);
  }
}

export namespace CreateCustomer {
  export type Input = {
    userId: number;
    businessName: string;
    document: string;
    email: string;
  };
  export type Output = void;
}
