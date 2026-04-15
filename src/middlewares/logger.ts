import { RequestHandler } from "express";
import logger from "../utils/logger";

export const requestsLogger: RequestHandler = (req, res, next) => {
  logger.info(`HTTP/${req.httpVersion} ${req.method} ${req.url}`);
  next();
};
