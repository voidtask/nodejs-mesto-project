import z from "zod";

export const AppErrorSchema = z.object({
  reason: z.string().optional(),
  status: z.number(),
});

export type AppError = z.infer<typeof AppErrorSchema>;

export const isAppError = (value: unknown): value is AppError => {
  return AppErrorSchema.safeParse(value).success;
};
