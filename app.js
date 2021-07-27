require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// CORS
const cors = require("cors");
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
const apiRouter = express.Router();
app.use("/api", apiRouter);

const usersRouter = require("./routes/users.route"); // Knex demonstration
apiRouter.use("/users", usersRouter);

// To allow us to deploy both front and backend on Heroku, instead of backend to Heroku and frontend to Netlify
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
