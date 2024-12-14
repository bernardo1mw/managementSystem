import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { SharedProviderEnum } from '../providers/shared/shared.providers';
import { TokenManager } from 'src/domain/contracts/token.contract';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SharedProviderEnum.TokenManager)
    private readonly tokenManager: TokenManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers[`authorization`].replace(/^Bearer\s/, '');
      const tokenDecrypted = await this.tokenManager.verify(token);
      request.user = tokenDecrypted.uid;
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
