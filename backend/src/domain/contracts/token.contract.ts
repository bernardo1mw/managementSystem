export interface TokenManager {
  verify(
    token: string,
    config?: TokenManager.Config,
  ): Promise<TokenManager.Params>;
  generateToken(
    params: TokenManager.Params,
    config?: TokenManager.Config,
  ): Promise<TokenManager.Result>;
}

export namespace TokenManager {
  export type Config = Partial<{
    secret: string;
    expiresIn: string;
    alg: string;
  }>;
  export type Params = {
    id: string;
    uid: any;
    [key: string]: unknown;
  };

  export type Result = string;
}
