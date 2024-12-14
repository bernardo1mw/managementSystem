import { FactoryProvider, Provider } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/connection';
import UserRepository from 'src/domain/repository/user.repository';
import { UserRepositoryTypeORMAdapter } from 'src/infra/database/repository/user.repository.adapter';
import { SharedProviderEnum } from '../shared/shared.providers';
import CustomerRepository from 'src/domain/repository/customer.repository';
import OrderRepository from 'src/domain/repository/order.repository';
import ProductRepository from 'src/domain/repository/product.repository';
import { OrderRepositoryTypeORMAdapter } from 'src/infra/database/repository/order.repository.adapter';
import { ProductRepositoryTypeORMAdapter } from 'src/infra/database/repository/product.repository.adapter';
import { CustomerRepositoryTypeORMAdapter } from 'src/infra/database/repository/customer.repository.adapter';

export enum RepositoryProviderEnum {
  UserRepository = 'UserRepository',
  CustomerRepository = 'CustomerRepository',
  OrderRepository = 'OrderRepository',
  ProductRepository = 'ProductRepository',
}

const userRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: RepositoryProviderEnum.UserRepository,
  useFactory: (connection: DatabaseConnection) =>
    new UserRepositoryTypeORMAdapter(connection.getConnection()),
  inject: [SharedProviderEnum.DatabaseConnection],
};

const customerRepositoryProvider: FactoryProvider<CustomerRepository> = {
  provide: RepositoryProviderEnum.CustomerRepository,
  useFactory: (connection: DatabaseConnection) =>
    new CustomerRepositoryTypeORMAdapter(connection.getConnection()),
  inject: [SharedProviderEnum.DatabaseConnection],
};

const orderRepositoryProvider: FactoryProvider<OrderRepository> = {
  provide: RepositoryProviderEnum.OrderRepository,
  useFactory: (connection: DatabaseConnection) =>
    new OrderRepositoryTypeORMAdapter(connection.getConnection()),
  inject: [SharedProviderEnum.DatabaseConnection],
};

const productRepositoryProvider: FactoryProvider<ProductRepository> = {
  provide: RepositoryProviderEnum.ProductRepository,
  useFactory: (connection: DatabaseConnection) =>
    new ProductRepositoryTypeORMAdapter(connection.getConnection()),
  inject: [SharedProviderEnum.DatabaseConnection],
};

export const repositoryProviders: Provider[] = [
  userRepositoryProvider,
  customerRepositoryProvider,
  orderRepositoryProvider,
  productRepositoryProvider,
];
