import { FactoryProvider, Provider } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/connection';
import UserRepository from 'src/domain/repository/user.repository';
import { UserRepositoryTypeORMAdapter } from 'src/infra/database/repository/user.repository.adapter';
import { SharedProviderEnum } from '../shared/shared.providers';
import { FindAllCustomersQuery } from 'src/app/commands/customer/find-all-customers.query';
import CustomerRepository from 'src/domain/repository/customer.repository';
import { RepositoryProviderEnum } from '../repository/repository.providers';
import { CreateCustomerCommand } from 'src/app/commands/customer/create-customer.command';
import { FindCustomerQuery } from 'src/app/commands/customer/find-customer.query';

export enum CustomerProviderEnum {
  FindAllCustomersQuery = 'FindAllCustomersQuery',
  CreateCustomerCommand = 'CreateCustomerCommand',
  FindCustomerQuery = 'FindCustomerQuery'
}

const findAllCustomersQueryProvider: FactoryProvider<FindAllCustomersQuery> = {
  provide: CustomerProviderEnum.FindAllCustomersQuery,
  useFactory: (
    customerRepository: CustomerRepository,
    userRepository: UserRepository,
  ) => new FindAllCustomersQuery(customerRepository, userRepository),
  inject: [
    RepositoryProviderEnum.CustomerRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const createCustomerQueryProvider: FactoryProvider<CreateCustomerCommand> = {
  provide: CustomerProviderEnum.CreateCustomerCommand,
  useFactory: (
    userRepository: UserRepository,
    customerRepository: CustomerRepository,
  ) => new CreateCustomerCommand(userRepository, customerRepository),
  inject: [
    RepositoryProviderEnum.UserRepository,
    RepositoryProviderEnum.CustomerRepository,
  ],
};

const findCustomerQueryProvider: FactoryProvider<FindCustomerQuery> = {
  provide: CustomerProviderEnum.FindCustomerQuery,
  useFactory: (
    customerRepository: CustomerRepository,
  ) => new FindCustomerQuery(customerRepository),
  inject: [
    RepositoryProviderEnum.CustomerRepository,
  ],
}

export const customerProviders: Provider[] = [
  findAllCustomersQueryProvider,
  findCustomerQueryProvider,
  createCustomerQueryProvider,
];
