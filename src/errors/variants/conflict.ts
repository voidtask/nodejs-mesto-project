import { AppError } from "../base";

export const Conflict = (reason: string = "Conflict") => new AppError(409, reason);
