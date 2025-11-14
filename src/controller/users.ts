import { BadRequest } from "../errors/bad-request";
import { NotFound } from "../errors/not-found";
import { RequestHandler } from "express";
import { userModel, UserSchema } from "../model/user";
import mongoose from "mongoose";

export const getUserById: RequestHandler = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw BadRequest("Invalid ID");
    }

    const user = await userModel.findById(_id);
    if (!user) {
      throw NotFound("User not found");
    }

    const payload = {
      id: String(user._id),
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    };

    return res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const getUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await userModel.find({});
    const payload = users.map(({ _id, name, about, avatar }) => {
      return { id: String(_id), name, about, avatar };
    });

    return res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const reqPayload = UserSchema.parse(req.body);

    const createdUser = await userModel.create({
      name: reqPayload.name,
      about: reqPayload.about,
      avatar: reqPayload.avatar,
    });

    const payload = {
      id: String(createdUser._id),
      name: createdUser.name,
      about: createdUser.about,
      avatar: createdUser.avatar,
    };

    return res.status(201).json(payload);
  } catch (err) {
    next(err);
  }
};
