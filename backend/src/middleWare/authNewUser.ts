import { Request, Response, NextFunction } from "express";

export const authNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.auth && req.auth.payload && req.auth.payload.sub) {
    const auth0UserId = req.auth.payload.sub;

    // TODO I can access userinfo through https://{yourDomain}/userinfo

    res.locals.userId = auth0UserId;
    res.locals.userEmail = "DUMMY@mail.com"; // FIXME Mocked email adress
  }
  next();
};
