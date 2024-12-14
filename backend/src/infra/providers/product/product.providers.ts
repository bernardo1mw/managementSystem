import { FactoryProvider, Provider } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/connection';
import UserRepository from 'src/domain/repository/user.repository';
import { UserRepositoryTypeORMAdapter } from 'src/infra/database/repository/user.repository.adapter';
import { SharedProviderEnum } from '../shared/shared.providers';
import { RepositoryProviderEnum } from '../repository/repository.providers';
import ProductRepository from 'src/domain/repository/product.repository';
import { FindAllProductsQuery } from 'src/app/commands/product/find-all-products.query';
import { CreateProductCommand } from 'src/app/commands/product/create-product.command';
import { DeleteProductCommand } from 'src/app/commands/product/delete-product.command';
import { GetProductQuery } from 'src/app/commands/product/get-product.query';
import { UpdateProductCommand } from 'src/app/commands/product/update-product.command';

export enum ProductProviderEnum {
  FindAllProductsQuery = 'FindAllProductsQuery',
  GetProductQuery = 'GetProductQuery',
  CreateProductCommand = 'CreateProductCommand',
  UpdateProductCommand = 'UpdateProductCommand',
  DeleteProductCommand = 'DeleteProductCommand',
}

const findAllProductsQueryProvider: FactoryProvider<FindAllProductsQuery> = {
  provide: ProductProviderEnum.FindAllProductsQuery,
  useFactory: (
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) => new FindAllProductsQuery(productRepository, userRepository),
  inject: [
    RepositoryProviderEnum.ProductRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const getProductQueryProvider: FactoryProvider<GetProductQuery> = {
  provide: ProductProviderEnum.GetProductQuery,
  useFactory: (
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) => new GetProductQuery(productRepository, userRepository),
  inject: [
    RepositoryProviderEnum.ProductRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const createProductCommandProvider: FactoryProvider<CreateProductCommand> = {
  provide: ProductProviderEnum.CreateProductCommand,
  useFactory: (
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) => new CreateProductCommand(productRepository, userRepository),
  inject: [
    RepositoryProviderEnum.ProductRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const updateProductCommandProvider: FactoryProvider<UpdateProductCommand> = {
  provide: ProductProviderEnum.UpdateProductCommand,
  useFactory: (
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) => new UpdateProductCommand(productRepository, userRepository),
  inject: [
    RepositoryProviderEnum.ProductRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

const deleteProductCommandProvider: FactoryProvider<DeleteProductCommand> = {
  provide: ProductProviderEnum.DeleteProductCommand,
  useFactory: (
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) => new DeleteProductCommand(productRepository, userRepository),
  inject: [
    RepositoryProviderEnum.ProductRepository,
    RepositoryProviderEnum.UserRepository,
  ],
};

export const productProviders: Provider[] = [
  findAllProductsQueryProvider,
  getProductQueryProvider,
  createProductCommandProvider,
  updateProductCommandProvider,
  deleteProductCommandProvider,
];
