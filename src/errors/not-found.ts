import { AppError } from "./_app-error";

export const NotFound = (message?: string): AppError =>
  new AppError(404, message ?? "Not Found");
