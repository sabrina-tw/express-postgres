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

.env

```
DB_NAME=xxx
DB_HOST=localhost
DB_USER=xxx
DB_PASS=xxx
DB_PORT=5432
```

## Usage

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

# [WIP] Deployment

**WIP: Works fine locally, but having this issue on [prod](https://express-postgres.netlify.app/):**

```
Access to XMLHttpRequest at 'https://express-postgres.herokuapp.com/users' from origin 'https://express-postgres.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Also, check the heroku logs when trying to access https://express-postgres.herokuapp.com/users - you will see that the request times out.**

- Frontend: https://express-postgres.netlify.app/
- API: https://express-postgres.herokuapp.com/

Steps taken:

### Server

- on Heroku web, create **Heroku** app and link to this repo
- add 'heroku postgres' add on under free "hobby dev" tier
- connect to heroku postgres using heroku CLI, create table and add dummy user
- add buildpack `https://github.com/timanovsky/subdir-heroku-buildpack.git` and drag to top of list
- add config var with `PROJECT_PATH` set to `.`
- add CORS configuration with `ORIGIN_URL` set to netlify url (WITHOUT THE TRAILING `/`)
- connection to db needs to take in `connectionString: process.env.DATABASE_URL`, DATABASE_URL being already populated in your Heroku config vars

### Client

- on Netlify web, create **Netlify** app
- under **continuous deployment** and build settings, link to this repo:
  - base directory: client
  - build command: npm run build
  - publish directory: client/build
- add `REACT_APP_API_URL` env var, set to heroku url (WITHOUT THE TRAILING `/`)

### Testing locally

If testing locally, be sure to add these env vars:

client/.env

- REACT_APP_API_URL=http://localhost:4000

.env

- ORIGIN_URL=http://localhost:3000
