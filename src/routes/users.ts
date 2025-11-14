import { createUser, getUserById, getUsers } from "../controller/users";
import { Router } from "express";

const route = Router();

route.get("/", getUsers);
route.get("/:id", getUserById);
route.post("/", createUser);

export { route as usersRoute };
