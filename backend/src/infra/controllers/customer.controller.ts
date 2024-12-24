// cliente.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Request,
  UseGuards,
  Param
} from '@nestjs/common';
import { CreateCustomerDto } from './dtos/createCustomerDto';
import { FindAllCustomersQuery } from 'src/app/commands/customer/find-all-customers.query';
import { CustomerProviderEnum } from '../providers/customer/customer.providers';
import { CreateCustomerCommand } from 'src/app/commands/customer/create-customer.command';
import { AuthGuard } from '../guards/auth.guard';
import { FindCustomerQuery } from 'src/app/commands/customer/find-customer.query';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(
    @Inject(CustomerProviderEnum.FindAllCustomersQuery)
    private findAllCustomersQuery: FindAllCustomersQuery,
    @Inject(CustomerProviderEnum.CreateCustomerCommand)
    private createCustomerCommand: CreateCustomerCommand,
    @Inject(CustomerProviderEnum.FindCustomerQuery)
    private findCustomerQuery: FindCustomerQuery,    
  ) {}

  @Get('all')
  async findAll(@Request() req) {
    return this.findAllCustomersQuery.execute({ userId: req.user });
  }

  @Get(':id')
  async findCustomer(@Param('id') id: number) {
    return this.findCustomerQuery.execute({ customerId: id });
  }

  @Post('register')
  create(
    @Request() req,
    @Body() { businessName, document, email }: CreateCustomerDto,
  ) {
    return this.createCustomerCommand.execute({
      userId: req.user,
      businessName,
      document,
      email,
    });
  }
}
