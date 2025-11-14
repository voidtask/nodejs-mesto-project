import { AppError } from "./_app-error";

export const BadRequest = (reason?: string): AppError => {
  return {
    status: 400,
    reason,
  };
};
