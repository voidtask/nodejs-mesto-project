import mongoose from "mongoose";
import z from "zod";
import { CardSchema } from "../schemas/card";

type TCard = z.infer<typeof CardSchema>;

const cardSchema = new mongoose.Schema<TCard>(
  {
    name: {
      type: String,
      required: true,
      validate: (value: unknown) =>
        CardSchema.shape.name.safeParse(value).success,
    },
    link: {
      type: String,
      required: true,
      validate: (value: unknown) =>
        CardSchema.shape.link.safeParse(value).success,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false }
);

export const cardModel = mongoose.model<TCard>("card", cardSchema);
