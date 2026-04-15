import { Router } from "express";
import { signin, signup } from "../controller/auth";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);

export { route as authRoute };
