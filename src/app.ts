import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { usersRoute } from "./routes/users";

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb://admin:qwerty12345@127.0.0.1:27017/mestodb?authSource=admin",
  )
  .then(() => {
    console.log("MongoDB connection established");
  });

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: "69175cae96828521ff8d235c",
  };

  next();
});

app.use("/users", usersRoute);

app.listen(3000, () => {
  console.log("Express listening on port :3000");
});
