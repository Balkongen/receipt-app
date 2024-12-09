import { Request, Response, NextFunction } from "express";

export const logger = (message: string): void => {
  console.log(`[Logger]: ${message}`);
};

export const logRequestProcessingTime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });
  next();
};
