import { AppError } from "./_app-error";

export const BadRequest = (message?: string): AppError =>
  new AppError(400, message ?? "Bad Request");
