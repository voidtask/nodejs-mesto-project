import { AppError } from "../base";

export const NotFound = (message?: string): AppError =>
  new AppError(404, message ?? "Not Found");
