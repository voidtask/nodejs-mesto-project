import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUserAvatar,
  updateUserInfo,
} from "../controller/users";

const route = Router();

route.get("/", getUsers);
route.get("/:id", getUserById);
route.post("/", createUser);

route.patch("/me", updateUserInfo);
route.patch("/me/avatar", updateUserAvatar);

export { route as usersRoute };
