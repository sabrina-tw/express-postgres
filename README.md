# express-postgres

Playground to set up Postgres in Express.

Packages used:

- [pg (node-postgres)](https://www.npmjs.com/package/pg)

Packages to potentially look into:

- [Sequelize](https://sequelize.org/) ORM
- [knex](https://github.com/knex/knex) query builder

See: https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/

## Installation

```
npm i express pg dotenv
npm i nodemon -D
```

## Configuration

.env
- for knex + sequelize
- same DB host and port

```
PG_HOST=localhost
PG_PORT=5432

PG_DATABASE=xxx
PG_USER=xxx
PG_PASSWORD=xxx

DB_NAME_SEQUELIZE=devTraining2021
DB_USER_SEQUELIZE=devtraining2021
DB_PASS_SEQUELIZE=
```
### [WIP] Test Your Setup

`npm run knex:migrate`

`npm run sequelize:migrate` - upcoming

`npm start`

To access knex backed apis, goto: http://localhost:4000/api/users

To access sequelize backed apis, goto: http://localhost:4000/sequelize/users

---

## Configuration for KNEX
db.js

```
const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

## Usage of KNEX

users.route.js (implementing this in routes for simplicity - best to extract the actual querying into a users.controller.js)

```
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    let users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (err) {
    res.status(500);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500);
  }
})

module.exports = router;
```

`npm start`

### [WIP] Authentication

(can abandon if we go with Sequelize)
(probably similar for Sequelize, just changes in model I guess - TBC)

From: https://gist.github.com/laurenfazah/f9343ae8577999d301334fc68179b485

```
npm i bcrypt knex
npm i -g knex
```

```
// knexfile.js
exports.up = function (knex, Promise) {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT,
    token TEXT,
    password_digest TEXT,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex, Promise) {
  let dropQuery = `DROP TABLE users`;
  return knex.raw(dropQuery);
};
```

Create migration file

`knex migrate:make create-users-table`

Migrate

```
knex migrate:latest
```

TODO: set up User model

---
# Testing

## Installation

Packages used:

- [pg-mem](https://www.npmjs.com/package/pg-mem)
- jest
- supertest

```
npm i pg-mem jest supertest -D
```

## Usage

Implementation can be further refined? Can also explore other alternatives to `pg-mem`.

users.route.test.js

```
const { newDb } = require("pg-mem");
const { Pool: MockPool } = newDb().adapters.createPg();
const mockPool = new MockPool();

jest.mock("../db", () => {
  return {
    query: jest.fn().mockImplementation((...args) => {
      return mockPool.query(...args);
    })
  };
});

describe("users", () => {
  beforeAll(async () => {
    await mockPool.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT(255))"
    );
    await mockPool.query(
      "INSERT INTO users (name) VALUES ('Sabrina')"
    );
  });

  afterAll(async () => {
    await mockPool.query("DROP TABLE IF EXISTS users");
  });
});
```

`npm run test`

---
# [WIP] Deployment

App URL: https://express-postgres.herokuapp.com/

**When trying to access https://express-postgres.herokuapp.com/api/users - you will see that the request times out**

Steps taken to deploy:

- on Heroku web, create **Heroku** app and link to this repo
- add 'heroku postgres' add on under free "hobby dev" tier
- connect to heroku postgres using heroku CLI, create table and add dummy user
- add buildpack `https://github.com/timanovsky/subdir-heroku-buildpack.git` and drag to top of list (not sure if strictly necessary)
- add config var with `PROJECT_PATH` set to `.`
- add config var with `REACT_APP_API_URL` set to `http://express-postgres.herokuapp.com` (WITHOUT trailing `/`)
- connection to db needs to take in `connectionString: process.env.DATABASE_URL`, DATABASE_URL being already populated in your Heroku config vars

### Testing locally

If testing locally, be sure to add these env vars in `client/.env`:

- SKIP_PREFLIGHT_CHECK=true
- REACT_APP_API_URL=http://localhost:4000

# TODO

- [] Lab: security-jwt ([mongoose version](https://thoughtworks-sea.github.io/developer-training/#/backend/security-jwt?id=lab-quick-start-security-jwt))
- [] Lab: hashing passwords with bcrypt ([mongoose version](https://thoughtworks-sea.github.io/developer-training/#/backend/mongodb/mongoose-middleware))
- [] Lab: express/postgres ([mongoose version](https://thoughtworks-sea.github.io/developer-training/#/backend/mongodb/express-mongoose-lab))
- [] [Guide to deploy express/postgres app on Heroku](https://thoughtworks-sea.github.io/developer-training/#/backend/express-deploy-postgres) (WIP)
- [] [Guide to deploy express/postgres/react app on Heroku](https://thoughtworks-sea.github.io/developer-training/#/delivering-software/deploying-full-stack) (WIP)
- [] Hide pages on MongoDB from sidebar
