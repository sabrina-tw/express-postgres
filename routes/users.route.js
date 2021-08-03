import express from 'express';
const router = express.Router();

import pool from '../db/index.js';
import User from '../models/user.model.js';

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

router.post("/signup", User.signup);

export default router;
