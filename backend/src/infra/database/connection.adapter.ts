import { DataSource } from 'typeorm';
import { DatabaseConnection } from './connection';

export class TypeOrmConnectionAdapter
  implements DatabaseConnection<DataSource>
{
  private dataSource: DataSource;

  isInitialized(): boolean {
    return this.dataSource?.isInitialized;
  }

  async connect(): Promise<void> {
    try {
      const connection = new DataSource({
        type: 'postgres',
        dropSchema: false,
        migrationsRun: false,
        entities: [`${__dirname}/mapping/*.{js,ts}`],
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        maxQueryExecutionTime: 5000,
      });
      await this.connectWithRetry(connection);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to connect to database');
    }
  }

  private async connectWithRetry(
    connection: DataSource,
    retries = 3,
    delay = 3000,
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.dataSource = await connection.initialize();
        return;
      } catch (error) {
        if (attempt < retries) {
          console.log(`Tentando novamente em ${delay / 1000} segundos...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw new Error(`Todas as tentativas de conexão falharam. ${error}`);
        }
      }
    }
  }

  getConnection(): DataSource {
    return this.dataSource;
  }
}
