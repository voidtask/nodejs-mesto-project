/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler";
import { cardsRoute } from "./routes/cards";
import { usersRoute } from "./routes/users";
import { setInContext } from "./utils/request-context";
import { NotFound } from "./errors/not-found";

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb://admin:qwerty12345@127.0.0.1:27017/mestodb?authSource=admin"
  )
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use((req: Request, res: Response, next: NextFunction) => {
  setInContext(req, "userId", "69175cae96828521ff8d235c");
  next();
});

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);

app.use("*", () => {
  throw NotFound();
});

// App's error handler must always be the last .use() call
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Express listening on port :3000");
});
