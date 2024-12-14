import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './infra/modules/customer.module';
import { ProductModule } from './infra/modules/product.module';
import { OrderModule } from './infra/modules/order.module';
import { SharedModule } from './infra/modules/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/modules/auth.module';
import { RepositoryModule } from './infra/modules/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    ProductModule,
    OrderModule,
    AuthModule,
    SharedModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
