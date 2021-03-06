import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

app.use(express.json());

// Routes
import usersRouter from './routes/users.route.js';

const apiRouter = express.Router();
app.use("/api", apiRouter);

/// Knex demonstration
apiRouter.use("/users", usersRouter);


// Sequelize demonstration
import { connectDb } from './sequelize.js';
import sequelizeRouter from './sequelize/routers/sequelize.route.js';

connectDb();
apiRouter.use("/sequelize", sequelizeRouter);


// To allow us to deploy both front and backend on Heroku, instead of backend to Heroku and frontend to Netlify
// ES6 instead of CommonJS: https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
import path from 'path';

app.use(express.static(path.resolve("client", "build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "build", "index.html"))
);

export default app;
