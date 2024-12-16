// pedido.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Inject,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { SignupCommand } from 'src/app/commands/auth/signup.command';
import { AuthProviderEnum } from '../providers/auth/auth.providers';
import { SigninDto } from './dtos/signinDto';
import { SigninCommand } from 'src/app/commands/auth/signin.command';
import { VerifyCommand } from 'src/app/commands/auth/verify.command';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthProviderEnum.LoginCommand)
    private readonly signinCommand: SigninCommand,
    @Inject(AuthProviderEnum.SignupCommand)
    private readonly signupCommand: SignupCommand,
    @Inject(AuthProviderEnum.VerifyCommand)
    private readonly verifyCommand: VerifyCommand,
  ) {}

  @Post('signin')
  async login(@Body() { email, password }: SigninDto): Promise<any> {
    return this.signinCommand.execute({
      email,
      password,
    });
  }

  @Post('signup')
  create(@Body() { email, password }: CreateUserDto) {
    return this.signupCommand.execute({ email, password });
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verify(@Request() req) {
    return this.verifyCommand.execute({ userId: req.user });
  }
}
