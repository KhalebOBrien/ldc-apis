import { knex } from 'knex';
import 'dotenv/config';

import { development, production, test } from './EnvironmentConfig';

const getEnvironment = () => {
  switch (process.env.MODE) {
    case 'production': return production;
    case 'test': return test;

    default: return development;
  }
};

export const Knex = knex(getEnvironment());
