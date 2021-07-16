const express = require("express");
const router = express.Router();
const pool = require("./db");

router.get("/", async (req, res) => {
  try {
    let users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (err) {
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const user = await pool.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(user.rows[0]);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
