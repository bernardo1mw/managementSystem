import { Module } from '@nestjs/common';
import { CustomerController } from '../controllers/customer.controller';
import { customerProviders } from '../providers/customer/customer.providers';

@Module({
  controllers: [CustomerController],
  providers: customerProviders,
})
export class CustomerModule {}
