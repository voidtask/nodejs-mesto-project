import { Router } from "express";
import {
  createCard,
  deleteCardById,
  getCards,
  likeCardById,
  unlikeCardById,
} from "../controller/cards";

const route = Router();

route.get("/", getCards);
route.post("/", createCard);
route.delete("/:id", deleteCardById);

route.put("/:id/likes", likeCardById);
route.delete("/:id/likes", unlikeCardById);

export { route as cardsRoute };
