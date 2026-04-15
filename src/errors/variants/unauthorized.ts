import { AppError } from "../base";

export const Unauthorized = (reason: string = "Unauthorized") => new AppError(401, reason);
