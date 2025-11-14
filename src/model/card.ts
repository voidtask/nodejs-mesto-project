import mongoose from "mongoose";
import z from "zod";
import { ICard } from "./card.interface";

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: (value: unknown) => {
      return z.url().safeParse(value).success;
    },
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
});

export default mongoose.model<ICard>("card", cardSchema);
