import mongoose from "mongoose";

export interface ICard {
  name: string;
  createdAt: Date;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  link: string;
}
