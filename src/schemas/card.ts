import z from "zod";
import { ObjectIdSchema } from "./mongo";

export const CardSchema = z.object({
  name: z.string().min(2).max(30),
  link: z.url(),
  createdAt: z.date().default(() => new Date()),
  owner: ObjectIdSchema,
  likes: z.array(ObjectIdSchema),
});
