const fs = require('fs');

const dbDialect = process.env.DB_DIALECT_SEQUELIZE || "postgres";

const dbUser = process.env.DB_USER_SEQUELIZE || "user";
const dbPass = process.env.DB_PASS_SEQUELIZE;
const dbHost = process.env.PG_HOST || "localhost";
const dbPort = process.env.PG_PORT || 5432;

module.exports =
{
  "development": {
    "username": dbUser,
    "password": dbPass,
    "database": process.env.DB_NAME_SEQUELIZE || "devDB",
    "host": dbHost,
    "port": dbPort,
    "dialect": dbDialect
  },
  "test": {
    "username": dbUser,
    "password": dbPass,
    "database": process.env.DB_NAME_SEQUELIZE || "testDB",
    "host": dbHost,
    "port": dbPort,
    "dialect": dbDialect
  },
  "production": {
    "username": dbUser,
    "password": dbPass,
    "database": process.env.DB_NAME_SEQUELIZE,
    "host": dbHost,
    "port": dbPort,
    "dialect": dbDialect
  }
}
