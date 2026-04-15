import { Router } from "express";
import { getUserById, getUsers, updateUserAvatar, updateUserInfo } from "../controller/users";
import { requireAuth } from "../middlewares/auth";

const route = Router();

route.use(requireAuth);

route.get("/", getUsers);
route.get("/:id", getUserById);

route.patch("/me", updateUserInfo);
route.patch("/me/avatar", updateUserAvatar);

export { route as usersRoute };
