import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.auth && req.auth.payload && req.auth.payload.sub) {
    const auth0UserId = req.auth.payload.sub;

    res.locals.userId = auth0UserId;
  }
  next();
};
