import express from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/base";
import logger from "../utils/logger";

export const errorHandler = async (
  err: unknown,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json(err.issues ?? []);
  }

  logger.error(err);

  return res.status(500).json({ message: "Internal Server Error" });
};
