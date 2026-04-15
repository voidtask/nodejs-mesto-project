import { AppError } from "../base";

export const BadRequest = (message?: string): AppError =>
  new AppError(400, message ?? "Bad Request");
