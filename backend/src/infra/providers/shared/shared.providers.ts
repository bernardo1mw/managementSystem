import {
  ClassProvider,
  FactoryProvider,
  Provider,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TokenManager } from 'src/domain/contracts/token.contract';
import { JsonWebTokenAdapter } from 'src/infra/crypto/json-web-token.adapter';
import { DatabaseConnection } from 'src/infra/database/connection';
import { TypeOrmConnectionAdapter } from 'src/infra/database/connection.adapter';

export enum SharedProviderEnum {
  DatabaseConnection = 'DatabaseConnection',
  UUIDGenerator = 'UUIDGenerator',
  TokenManager = 'TokenManager',
  //   StringHashing = 'StringHashing',
  //   HttpClient = 'HttpClient',
  //   Mailer = 'Mailer',
  //   EventBus = 'EventBus',
}

// - DATABASE
const databaseProvider: FactoryProvider<DatabaseConnection> = {
  provide: SharedProviderEnum.DatabaseConnection,
  useFactory: async (): Promise<DatabaseConnection> => {
    try {
      const database = new TypeOrmConnectionAdapter();
      await database.connect();
      return database;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  },
};

const tokenManagerProvider: ClassProvider<TokenManager> = {
  provide: SharedProviderEnum.TokenManager,
  useClass: JsonWebTokenAdapter,
};

export const sharedProviders: Provider[] = [
  databaseProvider,
  tokenManagerProvider,
];
