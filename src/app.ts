/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler";
import { cardsRoute } from "./routes/cards";
import { usersRoute } from "./routes/users";
import { NotFound } from "./errors";
import { authRoute } from "./routes/auth";
import { requestsLogger } from "./middlewares/logger";

const app = express();

app.use(express.json());
app.use(requestsLogger);

mongoose
  .connect("mongodb://admin:qwerty12345@127.0.0.1:27017/mestodb?authSource=admin")
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use(authRoute);

app.use("*", () => {
  throw NotFound();
});

// error handler at the end
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Express listening on port :3000");
});
