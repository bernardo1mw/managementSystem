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

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => Item)
  items: Item[];
}

class Item {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
