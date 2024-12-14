// cliente.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerDto } from './dtos/createCustomerDto';
import { FindAllCustomersQuery } from 'src/app/commands/customer/find-all-customers.query';
import { CustomerProviderEnum } from '../providers/customer/customer.providers';
import { CreateCustomerCommand } from 'src/app/commands/customer/create-customer.command';
import { AuthGuard } from '../guards/auth.guard';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(
    @Inject(CustomerProviderEnum.FindAllCustomersQuery)
    private findAllCustomersQuery: FindAllCustomersQuery,
    @Inject(CustomerProviderEnum.CreateCustomerCommand)
    private createCustomerCommand: CreateCustomerCommand,
  ) {}

  @Get('all')
  async findAll(@Request() req) {
    return this.findAllCustomersQuery.execute({ userId: req.user });
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
