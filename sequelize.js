const { Sequelize } = require('sequelize');

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

const doMigration = () => {
  // https://sequelize.org/master/manual/model-basics.html
}

module.exports = {
  connectDbThenMigrate
}