require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
    res.status(200).json({"test": "done"});
});

app.use(express.json());

// Knex demonstration
const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);

module.exports = app;
