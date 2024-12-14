import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { orderProviders } from '../providers/order/order.providers';

@Module({
  providers: orderProviders,
  controllers: [OrderController],
})
export class OrderModule {}
