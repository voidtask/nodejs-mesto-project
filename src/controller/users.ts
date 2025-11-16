import { RequestHandler } from "express";
import mongoose from "mongoose";
import { BadRequest } from "../errors/bad-request";
import { NotFound } from "../errors/not-found";
import { userModel } from "../model/user";
import { UserSchema } from "../schemas/user";
import { getFromContext, requireFromContext } from "../utils/request-context";

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    if (!mongoose.isValidObjectId(targetUserId)) {
      throw BadRequest("Invalid ID");
    }

    const targetUser = await userModel.findById(targetUserId);
    if (!targetUser) {
      throw NotFound("User not found");
    }

    const payload = {
      id: String(targetUser._id),
      name: targetUser.name,
      about: targetUser.about,
      avatar: targetUser.avatar,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const getUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await userModel.find({});
    const payload = users.map(({ _id, name, about, avatar }) => ({
      id: String(_id),
      name,
      about,
      avatar,
    }));

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const reqPayload = UserSchema.pick({
      name: true,
      about: true,
      avatar: true,
    }).parse(req.body);

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

    res.status(201).json(payload);
  } catch (err) {
    next(err);
  }
};

export const updateUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const currentUserId = requireFromContext<string>(req, "userId");

    const { name, about } = UserSchema.pick({ name: true, about: true })
      .partial()
      .parse(req.body);

    const updatedUser = await userModel.findByIdAndUpdate(
      currentUserId,
      { $set: { name, about } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw NotFound("User with provided ID not found");
    }

    const payload = {
      id: String(updatedUser._id),
      name: updatedUser.name,
      about: updatedUser.about,
      avatar: updatedUser.avatar,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const updateUserAvatar: RequestHandler = async (req, res, next) => {
  try {
    const currentUserId = getFromContext(req, "userId");

    const { avatar } = UserSchema.pick({ avatar: true }).parse(req.body);

    const updatedUser = await userModel.findByIdAndUpdate(
      currentUserId,
      { $set: { avatar } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw NotFound("User with provided ID not found");
    }

    const payload = {
      id: String(updatedUser._id),
      name: updatedUser.name,
      about: updatedUser.about,
      avatar: updatedUser.avatar,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};
