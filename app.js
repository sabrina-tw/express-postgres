require("dotenv").config();

// DB interactions

const sequelize = require("./sequelize");
sequelize.connectDb();

const sequelizeRouter = require("./sequelize/routers/sequelize.route");

// START OF APP REQ

const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

app.use(express.json());

// Routes
const apiRouter = express.Router();
app.use("/api", apiRouter);

const usersRouter = require("./routes/users.route"); // Knex demonstration
apiRouter.use("/users", usersRouter);

// To allow us to deploy both front and backend on Heroku, instead of backend to Heroku and frontend to Netlify
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

// Sequelize demonstration
app.use("/sequelize", sequelizeRouter);

module.exports = app;
