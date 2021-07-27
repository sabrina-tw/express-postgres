const { Sequelize } = require('sequelize');

// Dependencies to generate models and create DB tables
const UserModel = require('./sequelize/models/user');

const dbName = process.env.DB_NAME || "testDB";
const dbUser = process.env.DB_USER || "user";
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 5432;

// const sequelize = new Sequelize(`postgres://${dbUser}@${dbHost}:${dbPort}/${dbName}`);

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  // pool: {
  //   max: 10,        // default: 5
  //   min: 0,         // default: 0
  //   idle: 10000,    // default: 10000ms
  //   acquire: 30000, // default: 60000ms
  //   evict: 1000     // default: 1000ms
  // },
});

const connectDbThenMigrate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    doMigration();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Pass in Sequelize to resolve the same instance for DataTypes support
const User = UserModel(sequelize, Sequelize);

/*
1. User.sync() : This creates the table if not exist (does nothing if exists)
2. User.sync({ force: true }) : Creates the table, or drop it first if exist
3. User.sync({ alter: true }) : Checks the current state of the table in the 
   database and performs the necessary changes in the table.
 */

// See: https://sequelize.org/master/manual/model-basics.html#database-safety-check (to sync on certain tables using RegExp)
// See: https://sequelize.org/master/manual/migrations.html for Production level
const doMigration = async () => {
  // await User.sync();
  // console.log("The table for the User model was just (re)created!");
  // await sequelize.sync({ force: true });  // Not recommended for production-level software, potentially destructive
  sequelize.sync();
  console.log("All models were synchronized successfully.");
}

module.exports = {
  connectDbThenMigrate,
  User
}