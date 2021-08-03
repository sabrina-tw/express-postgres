const express = require("express");

const router = express.Router();

const handleError = require('../../utils/error-handlers');

// dependencies to get Sequelize models
const { User } = require("../../sequelize");

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.use(handleError);

module.exports = router;
