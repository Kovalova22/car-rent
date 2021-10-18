import { Pool } from 'pg';

class DbClient {
  public client: Pool;

  constructor() {
    this.client = new Pool({
      host: process.env.CAR_RENT_DB_HOST || 'localhost',
      database: process.env.CAR_RENT_DB_NAME || 'car-rent',
      user: process.env.CAR_RENT_DB_USER || 'User',
      password: process.env.CAR_RENT_DB_PASSWORD || 'admin',
      port: +(process.env.CAR_RENT_DB_PORT || 5432),
    });
  }
}

export const db = new DbClient();
