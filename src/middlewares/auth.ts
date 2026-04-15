import { RequestHandler } from "express";
import { tokens } from "../utils/tokens";
import { setInContext } from "../utils/request-context";
import { Unauthorized } from "../errors";

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw Unauthorized("Invalid credentials.");
    }

    const token = authHeader.split(" ")[1];
    const payload = await tokens.verify(token);

    setInContext(req, "userId", payload._id);

    next();
  } catch (err) {
    next(err);
  }
};
