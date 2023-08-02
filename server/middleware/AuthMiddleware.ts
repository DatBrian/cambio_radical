import { Request, Response, NextFunction } from "express";

class Helpers {
  public static isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  }
}

export default Helpers;