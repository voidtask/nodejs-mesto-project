import express from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/_app-error";

export const errorHandler = async (
  err: unknown,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join("\n");
    return res.status(400).json({ message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({ message: "Internal Server Error" });
};
