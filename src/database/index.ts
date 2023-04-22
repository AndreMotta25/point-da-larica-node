import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'pointDaLarica',
  port: 9000,
  entities: [
    './src/modules/coupons/entities/*.ts',
    './src/modules/orders/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
});
