import { AppError } from "../base";

export const Forbidden = (message?: string) =>
  new AppError(403, message ?? "Forbidden");
