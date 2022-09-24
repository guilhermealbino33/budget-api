import 'reflect-metadata';

import 'dotenv/config';
import 'express-async-errors';
import './shared/container';
import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import logging from './shared/config/logging';
import MainSeeder from './shared/seeds/mainSeeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [`${__dirname}/**/entities/**.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/**.{ts,js}`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(() => {
    logging.info('Data Source has been initialized!');
  })
  .catch((err) => {
    logging.error('Error during Data Source initialization', err);
  });
