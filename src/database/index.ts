import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'desenhos1@',
  database: 'pointDaLarica',
  port: 5432,
  entities: ['./src/modules/coupons/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
});
