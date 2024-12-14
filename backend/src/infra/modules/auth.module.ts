import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { authProviders } from '../providers/auth/auth.providers';

@Module({
  providers: authProviders,
  controllers: [AuthController],
})
export class AuthModule {}
