import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { MainSeeder } from './seeds/MainSeeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'pointDaLarica',
  port: 9000,
  entities: [
    './src/modules/coupons/entities/*.ts',
    './src/modules/orders/entities/*.ts',
    './src/modules/users/entities/*.ts',
    './src/modules/courtesy/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
  seeds: [MainSeeder],
};

export default new DataSource(options);
