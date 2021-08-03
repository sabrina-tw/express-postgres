# Sequelize Basics

## Configuration
.env
```
PG_HOST=localhost
PG_PORT=5432

DB_NAME_SEQUELIZE=devTraining2021
DB_USER_SEQUELIZE=devtraining2021
DB_PASS_SEQUELIZE=
```

### Pre-requisite: Setting up database and create database user

#### Notes
- Try to use lowercase, as you might run into issues of [case-sensitivity of database](https://dba.stackexchange.com/questions/31059/error-database-dbname-does-not-exist).
- You may run `\conninfo` in psql command line to get the current logged in user which is in-use. 

#### Steps
1. On terminal, run the following to set up database
```
# database is case-sensitive
createdb devTraining2021
psql -d devTraining2021
```

2. Inside psql command line, run
```
CREATE USER postgres;
GRANT all privileges ON DATABASE "devTraining2021" TO postgres;

# user is case-insensitive, looks like psql didn't reject on wrong password
CREATE USER devTraining2021 with encrypted password 'P@ssw0rd';
GRANT connect ON DATABASE "devTraining2021" TO devtraining2021; 
REVOKE connect ON DATABASE "devTraining2021" FROM devtraining2021;
```

## Exploration
### Steps
0. Complete pre-requisite, setup .env
1. Run `npm start`, this will create the table "user" if it doesn't exist
2. Insert a record into the table. The script is found in `./sql/insert_user.sql`.
    ```
    INSERT INTO "user"(
      id, name, "firstName", "lastName", "createdAt", "updatedAt")
      VALUES (1, 
          'DISPLAY_NAME',
          'FIRST_NAME', 
          'LAST_NAME',
          current_timestamp, 
          current_timestamp);
    ```
3. Hit `http://localhost:4000/sequelize/users`

## (WIP) Migrations
0. Install `sequelize-cli` and add convenient script "sequelize".
    ```
    npm i --save-dev sequelize-cli
    ```

1. Set up `.sequelizerc` in the root path. The config file is defaulted to json, and we have to set up the configuration for `sequelize-cli` to accept [dynamic configuration](https://sequelize.org/master/manual/migrations.html#dynamic-configuration).
    ```
    const path = require('path');

    module.exports = {
      'config': path.resolve('sequelize/db', 'config.js'),
      'models-path': path.resolve('sequelize/db', 'models'),
      'seeders-path': path.resolve('sequelize/db', 'seeders'),
      'migrations-path': path.resolve('sequelize/db', 'migrations')
    }
    ```

2. Run the following to generate bootstrapping folders for sequelize migration.
    ```
    npm run sequelize -- init
    ```

3. Convert `config.js` (for sequelize-cli to take in env var) and update with correct values.
    - dialect
    - port

4. Run the following to generate first model and migrate
    ```
    npm run sequelize -- model:generate \
      --name User2 \
      --attributes name:string,firstName:string,lastName:string,email:string

    npm run sequelize -- db:migrate --env <ENV_IN_CONFIG_JS>
    ```

6. Run the following to seed the Database ?

## References
1. Postgres
    - https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e
    - https://www.postgresql.org/docs/13/
    - https://www.postgresql.org/docs/13/sql-commands.html
2. Sequelize 
    - [API reference](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)
    - https://sequelize.org/master/manual/getting-started.html

## Tasks
- [X] Testing the connection
- [X] Create first model and assert end-to-end
- [ ] Create first integration test
- [X] Run migration scripts via CLI
- [ ] Add complexities to model , modelling one-to-many relationship
- [ ] Eager loading + transactions