const environment = process.env.NODE_ENV || "development"; // set environment

import knexfile from '../knexfile.js';
const configuration = knexfile[environment];

import knex from 'knex';
const database = knex(configuration);

import bcrypt from 'bcrypt';
import crypto from 'crypto';

const signup = (req, res) => {
  const user = req.body;
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.password_digest = hashedPassword;
    })
    .then(() => createToken())
    .then((token) => (user.token = token))
    .then(() => createUser(user))
    .then((user) => {
      delete user.password_digest;
      res.status(201).json({ user });
    })
    .catch((err) => console.error(err));
};

// check out bcrypt's docs for more info on their hashing function
const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

// user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
const createUser = (user) => {
  return database
    .raw(
      "INSERT INTO users (username, password_digest, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, username, created_at, token",
      [user.username, user.password_digest, user.token, new Date()]
    )
    .then((data) => data.rows[0]);
};

// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString("base64"));
    });
  });
};

export default {
  signup,
};
