import mongoose from "mongoose";
import { z } from "zod";
import { UserSchema } from "../schemas/user";

export type TUser = z.infer<typeof UserSchema>;

const userMongooseSchema = new mongoose.Schema<TUser>(
  {
    email: {
      unique: true,
      type: String,
      required: true,
      validate: (value: unknown) => UserSchema.shape.email.safeParse(value).success,
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: (value: unknown) => UserSchema.shape.password.safeParse(value).success,
    },
    name: {
      type: String,
      required: false,
      default: "Жак-Ив Кусто",
      validate: {
        validator: (value: unknown) => UserSchema.shape.name.safeParse(value).success,
      },
    },
    about: {
      type: String,
      required: false,
      default: "Исследователь",
      validate: (value: unknown) => UserSchema.shape.about.safeParse(value).success,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (value: unknown) => UserSchema.shape.avatar.safeParse(value).success,
      },
    },
  },
  { versionKey: false },
);

export const userModel = mongoose.model("user", userMongooseSchema);
