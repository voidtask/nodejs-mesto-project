import { Router } from "express";
import { createCard, deleteCardById, getCards, likeCardById, unlikeCardById } from "../controller/cards";
import { requireAuth } from "../middlewares/auth";

const route = Router();

route.use(requireAuth);

route.get("/", getCards);
route.post("/", createCard);
route.delete("/:id", deleteCardById);

route.put("/:id/likes", likeCardById);
route.delete("/:id/likes", unlikeCardById);

export { route as cardsRoute };
