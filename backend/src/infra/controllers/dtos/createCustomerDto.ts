// dto/create-cliente.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @Length(14, 14, { message: 'O CNPJ deve ter 14 caracteres.' })
  document: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
