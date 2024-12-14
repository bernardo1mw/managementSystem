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

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  stock: number;
}
