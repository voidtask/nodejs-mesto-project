import { AppError } from "./_app-error";

export const Forbidden = (message?: string) =>
  new AppError(403, message ?? "Forbidden");
