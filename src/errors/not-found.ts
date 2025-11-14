import { AppError } from "./_app-error";

export const NotFound = (reason?: string): AppError => {
  return {
    status: 404,
    reason,
  };
};
