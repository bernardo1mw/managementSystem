import { FactoryProvider, Provider } from '@nestjs/common';
import UserRepository from 'src/domain/repository/user.repository';
import { RepositoryProviderEnum } from '../repository/repository.providers';
import OrderRepository from 'src/domain/repository/order.repository';
import { FindAllOrdersQuery } from 'src/app/commands/order/find-all-orders.query';
import { CreateOrderCommand } from 'src/app/commands/order/create-order-command';
import ProductRepository from 'src/domain/repository/product.repository';
import { DeleteOrderCommand } from 'src/app/commands/order/delete-order.command';
import CustomerRepository from 'src/domain/repository/customer.repository';
import { GetOrderQuery } from 'src/app/commands/order/get-order.query';

export enum OrderProviderEnum {
  FindAllOrdersQuery = 'FindAllOrdersQuery',
  CreateOrderCommand = 'CreateOrderCommand',
  DeleteOrderCommand = 'DeleteOrderCommand',
  GetOrderQuery = 'GetOrderQuery',
}

const findAllOrdersQueryProvider: FactoryProvider<FindAllOrdersQuery> = {
  provide: OrderProviderEnum.FindAllOrdersQuery,
  useFactory: (
    orderRepository: OrderRepository,
    customerRepository: CustomerRepository,
    userRepository: UserRepository,
  ) =>
    new FindAllOrdersQuery(orderRepository, customerRepository, userRepository),
  inject: [
    RepositoryProviderEnum.OrderRepository,
    RepositoryProviderEnum.CustomerRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const createOrderCommandProvider: FactoryProvider<CreateOrderCommand> = {
  provide: OrderProviderEnum.CreateOrderCommand,
  useFactory: (
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
  ) => new CreateOrderCommand(orderRepository, productRepository),
  inject: [
    RepositoryProviderEnum.OrderRepository,
    RepositoryProviderEnum.ProductRepository,
  ],
};

const getOrderQueryProvider: FactoryProvider<GetOrderQuery> = {
  provide: OrderProviderEnum.GetOrderQuery,
  useFactory: (
    orderRepository: OrderRepository,
    userRepository: UserRepository,
  ) => new GetOrderQuery(orderRepository, userRepository),
  inject: [
    RepositoryProviderEnum.OrderRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const deleteOrderCommandProvider: FactoryProvider<DeleteOrderCommand> = {
  provide: OrderProviderEnum.DeleteOrderCommand,
  useFactory: (orderRepository: OrderRepository) =>
    new DeleteOrderCommand(orderRepository),
  inject: [RepositoryProviderEnum.OrderRepository],
};
export const orderProviders: Provider[] = [
  findAllOrdersQueryProvider,
  createOrderCommandProvider,
  deleteOrderCommandProvider,
  getOrderQueryProvider,
];
