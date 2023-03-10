import { Knex } from 'knex'
import path from 'path'
import 'dotenv/config'

export const development: Knex.Config = {
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME || 'ldc_wallet',
    user: process.env.DATABASE_USERNAME || 'root',
    port: Number(process.env.DATABASE_PORT || 3306),
    password: process.env.DATABASE_PASSWORD,
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
}

export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
}

export const production: Knex.Config = {
  client: 'pg',
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 5432),
    ssl: { rejectUnauthorized: false },
  },
}
