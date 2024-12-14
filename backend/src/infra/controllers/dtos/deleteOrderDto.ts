// dto/create-pedido.dto.ts
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsDate,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  isNotEmpty,
  IsNumberString,
} from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty()
  @IsNumberString()
  customerId: number;

  @IsNotEmpty()
  @IsNumberString()
  orderId: number;
}
