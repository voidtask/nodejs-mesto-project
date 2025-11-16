import { RequestHandler } from "express";
import mongoose from "mongoose";
import z from "zod";
import { BadRequest } from "../errors/bad-request";
import { cardModel } from "../model/card";
import { NotFound } from "../errors/not-found";
import { Forbidden } from "../errors/forbidden";
import { requireFromContext } from "../utils/request-context";

export const getCards: RequestHandler = async (_req, res, next) => {
  try {
    const cards = await cardModel.find({});

    const payload = cards.map(
      ({ _id, name, createdAt, owner, likes, link }) => ({
        id: String(_id),
        name,
        createdAt: createdAt.toISOString(),
        owner: String(owner),
        likes: likes.map((entry) => String(entry)),
        link,
      })
    );

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

const CreateCardSchema = z.object({
  name: z.string().min(2).max(30),
  link: z.url(),
});

export const createCard: RequestHandler = async (req, res, next) => {
  try {
    const { name, link } = CreateCardSchema.parse(req.body);
    const ownerId = requireFromContext<string>(req, "userId");

    const createdCard = await cardModel.create({
      name,
      link,
      createdAt: new Date(),
      owner: String(ownerId),
      likes: [],
    });

    const payload = {
      id: String(createdCard._id),
      name: createdCard.name,
      link: createdCard.link,
      createdAt: createdCard.createdAt.toISOString(),
      likes: createdCard.likes.map(String),
      owner: String(createdCard.owner._id),
    };

    res.status(201).json(payload);
  } catch (err) {
    next(err);
  }
};

export const deleteCardById: RequestHandler = async (req, res, next) => {
  try {
    const cardId = String(req.params.id);
    if (!mongoose.isValidObjectId(cardId)) {
      throw BadRequest("Invalid object ID");
    }
    const reqUserId = requireFromContext<string>(req, "userId");

    const targetCard = await cardModel.findById(cardId);
    if (!targetCard) {
      throw NotFound();
    }

    if (String(targetCard.owner._id) !== reqUserId) {
      throw Forbidden("You are not the owner of the card");
    }

    await targetCard.delete();

    res.status(200).json(targetCard);
  } catch (err) {
    next(err);
  }
};

export const likeCardById: RequestHandler = async (req, res, next) => {
  try {
    const cardId = String(req.params.id);
    if (!mongoose.isValidObjectId(cardId)) {
      throw BadRequest("Invalid object ID");
    }

    const reqUserId = requireFromContext<string>(req, "userId");
    const likedCard = await cardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: reqUserId } },
      { new: true, runValidators: true }
    );

    if (!likedCard) {
      throw NotFound("Card with provided ID doesn't exist");
    }

    const payload = {
      id: String(likedCard._id),
      name: likedCard.name,
      link: likedCard.link,
      owner: String(likedCard.owner),
      likes: likedCard.likes,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const unlikeCardById: RequestHandler = async (req, res, next) => {
  try {
    const cardId = String(req.params.id);
    if (!mongoose.isValidObjectId(cardId)) {
      throw BadRequest("Invalid object ID");
    }

    const reqUserId = requireFromContext<string>(req, "userId");
    const unlikedCard = await cardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: reqUserId } },
      { new: true, runValidators: true }
    );

    if (!unlikedCard) {
      throw NotFound("Card with provided ID doesn't exist");
    }

    const payload = {
      id: String(unlikedCard._id),
      name: unlikedCard.name,
      link: unlikedCard.link,
      createdAt: unlikedCard.createdAt,
      likes: unlikedCard.likes,
      owner: unlikedCard.owner,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};
