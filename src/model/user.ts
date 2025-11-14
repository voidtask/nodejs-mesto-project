import mongoose from "mongoose";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2).max(30),
  about: z.string().min(2).max(200),
  avatar: z.url(),
});

export type TUser = z.infer<typeof UserSchema>;

const userMongooseSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    validate: {
      validator: (value: unknown) =>
        UserSchema.shape.name.safeParse(value).success,
    },
  },
  about: {
    type: String,
    validate: (value: unknown) =>
      UserSchema.shape.about.safeParse(value).success,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: unknown) =>
        UserSchema.shape.avatar.safeParse(value).success,
    },
  },
});

export const userModel = mongoose.model("user", userMongooseSchema);
