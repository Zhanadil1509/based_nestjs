import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config: ConfigService = new ConfigService();
const dbConfig = {
  type: 'postgres' as const,
  host: config.get<string>('DATABASE_HOST'),
  port: config.get<number>('DATABASE_PORT'),
  database: config.get<string>('DATABASE_NAME'),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  ssl: config.get('SSL_MODE', false),
  extra: {
    ssl:
      config.get('SSL_MODE', false) == 'true'
        ? {
            rejectUnauthorized: !config.get<boolean>('SSL_MODE', false),
          }
        : null,
  },
  logging: true,
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return dbConfig;
  },
};
export default new DataSource(dbConfig);
