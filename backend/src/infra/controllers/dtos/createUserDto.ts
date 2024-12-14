// dto/create-produto.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
