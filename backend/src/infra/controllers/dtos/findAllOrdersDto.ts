// dto/create-produto.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Min,
  Max,
  IsNumberString,
} from 'class-validator';

export class FindAllOrdersDto {
  @IsNotEmpty()
  @IsNumberString()
  customerId: number;
}
