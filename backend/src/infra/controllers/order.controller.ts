// pedido.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Inject,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrderDto';
import { OrderProviderEnum } from '../providers/order/order.providers';
import { FindAllOrdersQuery } from 'src/app/commands/order/find-all-orders.query';
import { CreateOrderCommand } from 'src/app/commands/order/create-order-command';
import { DeleteOrderCommand } from 'src/app/commands/order/delete-order.command';
import { DeleteOrderDto } from './dtos/deleteOrderDto';
import { AuthGuard } from '../guards/auth.guard';
import { GetOrderQuery } from 'src/app/commands/order/get-order.query';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    @Inject(OrderProviderEnum.FindAllOrdersQuery)
    private findAllOrdersQuery: FindAllOrdersQuery,
    @Inject(OrderProviderEnum.GetOrderQuery)
    private getOrderQuery: GetOrderQuery,
    @Inject(OrderProviderEnum.CreateOrderCommand)
    private createOrderCommand: CreateOrderCommand,
    @Inject(OrderProviderEnum.DeleteOrderCommand)
    private deleteOrderCommand: DeleteOrderCommand,
  ) {}

  @Get('all')
  findAll(@Request() req) {
    return this.findAllOrdersQuery.execute({ userId: req.user });
  }

  @Get(':orderId')
  findOne(@Request() req, @Param('orderId') orderId: number) {
    return this.getOrderQuery.execute({
      userId: req.user,
      orderId: orderId,
    });
  }

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderCommand.execute(createOrderDto);
  }

  @Delete(':orderId')
  delete(@Param(ValidationPipe) { orderId }: DeleteOrderDto) {
    return this.deleteOrderCommand.execute({
      orderId,
    });
  }
}
