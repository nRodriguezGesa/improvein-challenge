import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'cinematography',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});
