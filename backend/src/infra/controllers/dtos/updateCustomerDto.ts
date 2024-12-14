// dto/update-cliente.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './createCustomerDto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
