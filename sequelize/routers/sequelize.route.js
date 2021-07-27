const express = require("express");

const router = express.Router();

// dependencies to get Sequelize models
const { User } = require("../../sequelize");

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

const handleError = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
};
router.use(handleError);

module.exports = router;
