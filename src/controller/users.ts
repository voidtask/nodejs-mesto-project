import { RequestHandler } from "express";
import mongoose from "mongoose";
import { BadRequest, NotFound } from "../errors";
import { userModel } from "../model/user";
import { UserSchema } from "../schemas/user";
import { getFromContext, requireFromContext } from "../utils/request-context";

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    let targetUserId = req.params.id;
    if (targetUserId === "me") {
      targetUserId = requireFromContext<string>(req, "userId");
    }

    if (!mongoose.isValidObjectId(targetUserId)) {
      throw BadRequest("Invalid ID");
    }

    const targetUser = await userModel.findById(targetUserId);
    if (!targetUser) {
      throw NotFound("User not found");
    }

    const payload = {
      _id: String(targetUser._id),
      email: targetUser.email,
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
    const payload = users.map(({ _id, email, name, about, avatar }) => ({
      _id: String(_id),
      email,
      name,
      about,
      avatar,
    }));

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

export const updateUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const currentUserId = requireFromContext<string>(req, "userId");

    const { name, about } = UserSchema.pick({ name: true, about: true }).partial().parse(req.body);

    const updatedUser = await userModel.findByIdAndUpdate(
      currentUserId,
      { $set: { name, about } },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw NotFound("User with provided ID not found");
    }

    const payload = {
      _id: String(updatedUser._id),
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
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw NotFound("User with provided ID not found");
    }

    const payload = {
      _id: String(updatedUser._id),
      name: updatedUser.name,
      about: updatedUser.about,
      avatar: updatedUser.avatar,
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};
