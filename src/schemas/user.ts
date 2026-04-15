import z from "zod";

export const UserSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string().min(2).max(30).optional(),
  about: z.string().min(2).max(200).optional(),
  avatar: z.url().optional(),
});
