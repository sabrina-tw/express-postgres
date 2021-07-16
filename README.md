# express-postgres

Playground to set up Postgres in Express.

Packages used:
- [pg (node-postgres)](https://www.npmjs.com/package/pg)

Packages to potentially look into:
- [Sequelize](https://sequelize.org/) (See: https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/)

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
const pool = require("./db"); <---

router.get("/", async (req, res) => {
  try {
    let users = await pool.query("SELECT * FROM users"); <---
    res.status(200).json(users.rows); <---
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
    ); <---
    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500);
  }
})

module.exports = router;
```
