import mongoose from "mongoose";
import z from "zod";

export const ObjectIdSchema = z.preprocess(
  (value) => {
    if (mongoose.isValidObjectId(value) && typeof value === "string") {
      return mongoose.Types.ObjectId.createFromHexString(value);
    }
    return value;
  },
  z.custom<mongoose.Types.ObjectId>(
    (value) => value instanceof mongoose.Types.ObjectId,
    "Invalid ObjectId value"
  )
);
