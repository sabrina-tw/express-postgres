// not sure if this is relevant
// ES6: https://github.com/babel/example-node-server

import Sequelize from 'sequelize';

const devDbConnString = `postgresql://${process.env.DB_USER_SEQUELIZE}:${process.env.DB_PASS_SEQUELIZE}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.DB_NAME_SEQUELIZE}`;
const dbConnString = process.env.DATABASE_URL || devDbConnString; // for heroku

const dbDialect = process.env.DB_DIALECT_SEQUELIZE || "postgres";
const dbConnectViaSsl = process.env.PG_SSL_MODE !== "false";

// const sequelize = new Sequelize(`postgres://${dbUser}@${dbHost}:${dbPort}/${dbName}`);

const dbDialectOptions = dbConnectViaSsl ? {
  // SSL connection
  // https://github.com/sequelize/sequelize/issues/10015
  // https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificat
  ssl: {
    require: dbConnectViaSsl,
    rejectUnauthorized: false
  }
} : {};

const sequelize = new Sequelize(dbConnString, {
  dialect: dbDialect,
  dialectOptions: dbDialectOptions,
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  // pool: {
  //   max: 10,        // default: 5
  //   min: 0,         // default: 0
  //   idle: 10000,    // default: 10000ms
  //   acquire: 30000, // default: 60000ms
  //   evict: 1000     // default: 1000ms
  // }
});

// -----------------------------------------------------
// ------------ LEGACY FOR REFERNCE --------------------
// -----------------------------------------------------

// This function shouldn't be used as part of app lifecycle (especially in Prod), as migration is potentially destructive
// See: https://sequelize.org/master/manual/model-basics.html#database-safety-check (to sync on certain tables using RegExp)
// See: https://sequelize.org/master/manual/migrations.html for Production level

const connectDbThenMigrate = async () => {
  try {
    await connectDb();
    await doMigration();
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error('Migration fails.', error);
  }
}

/*
1. User.sync() : This creates the table if not exist (does nothing if exists)
2. User.sync({ force: true }) : Creates the table, or drop it first if exist
3. User.sync({ alter: true }) : Checks the current state of the table in the 
   database and performs the necessary changes in the table.
*/

// See: https://sequelize.org/master/manual/model-basics.html#database-safety-check (to sync on certain tables using RegExp)
// See: https://sequelize.org/master/manual/migrations.html for Production level
const doMigration = async () => {
  // await sequelize.sync({ force: true });  // Not recommended for production-level software, potentially destructive
  sequelize.sync();
  console.log("All models were synchronized successfully.");
}

// -----------------------------------------------------
// ------------------ ACTUAL IN USE --------------------
// -----------------------------------------------------

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// TODO: Review if we should remove the below from this file

// Dependencies to generate models and create DB tables
import UserModel from './sequelize/models/user.js';

// Pass in Sequelize to resolve the same instance for DataTypes support
export const User = UserModel(sequelize, Sequelize);