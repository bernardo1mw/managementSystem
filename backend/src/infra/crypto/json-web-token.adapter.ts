import * as jwt from 'jsonwebtoken';
import { TokenManager } from 'src/domain/contracts/token.contract';

export class JsonWebTokenAdapter implements TokenManager {
  constructor() {}

  async verify(token: string, config?: TokenManager.Config): Promise<any> {
    try {
      const decript = await jwt.verify(
        token,
        config?.secret || process.env.JWT_SECRET || 'jwt_scret',
      );
      return decript;
    } catch (e: any) {
      throw new Error('Invalid Token');
    }
  }

  async generateToken(
    params: TokenManager.Params,
    config?: TokenManager.Config,
  ): Promise<string> {
    try {
      return jwt.sign(
        params,
        config?.secret || process.env.JWT_SECRET || 'jwt_scret',
        {
          algorithm: config?.alg || process.env.JWT_ALGORITHM || 'HS256',
          expiresIn: config?.expiresIn || process.env.JWT_EXPIRES || '10h',
        },
      );
    } catch (e: any) {
      throw new Error('Failed to generate token');
    }
  }
}
