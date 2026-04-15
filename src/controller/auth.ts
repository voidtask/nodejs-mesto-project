import { RequestHandler } from "express";
import { UserSchema } from "../schemas/user";
import { userModel } from "../model/user";
import { secrets } from "../utils/secrets";
import { Conflict, NotFound, Unauthorized } from "../errors";
import { tokens } from "../utils/tokens";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const reqPayload = UserSchema.pick({
      email: true,
      password: true,
      name: true,
      about: true,
      avatar: true,
    }).parse(req.body);

    const hashedPassword = await secrets.hash(reqPayload.password);

    const createdUser = await userModel.create({
      email: reqPayload.email,
      password: hashedPassword,
      name: reqPayload.name,
      about: reqPayload.about,
      avatar: reqPayload.avatar,
    });

    const payload = {
      _id: String(createdUser._id),
      email: createdUser.email,
      name: createdUser.name,
      about: createdUser.about,
      avatar: createdUser.avatar,
    };

    res.status(201).json(payload);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === 11000) {
      next(Conflict("This email was taken."));
    } else {
      next(err);
    }
  }
};

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const reqPayload = UserSchema.pick({
      email: true,
      password: true,
    }).parse(req.body);

    const user = await userModel.findOne({ email: reqPayload.email }).select("+password");
    if (!user) {
      throw NotFound("User not found.");
    }

    const isValidPassword = await secrets.compare(reqPayload.password, user.password);
    if (!isValidPassword) {
      throw Unauthorized("Invalid credentials");
    }

    const jwtToken = await tokens.create(String(user._id));

    res.status(200).json({ accessToken: jwtToken });
  } catch (err) {
    next(err);
  }
};
