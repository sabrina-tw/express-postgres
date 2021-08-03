import pg from 'pg';
const { Pool } = pg;

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

let poolOptions = {
  connectionString: process.env.DATABASE_URL || connectionString
}

if (process.env.PG_SSL_MODE !== "false") {
  poolOptions.ssl = {
    rejectUnauthorized: false
  }
}

const pool = new Pool(poolOptions);

export default pool;