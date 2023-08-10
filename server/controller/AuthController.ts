/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthServices, { authServices } from "../services/AuthServices";
import { Request, Response } from "express";
// import passport from "passport";
import { generateToken } from "../common/FunctionsCommon";

export class AuthController {
  private readonly service: AuthServices;
  constructor() {
    this.service = authServices;
  }

  public signUp = async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;

    const newUser: any = await this.service.signUp({
      username,
      password,
      roles,
    });

    const data = { id: newUser._id };

    const token = await generateToken(data);

    res.json(token);
  };

  //   public signIn = passport.authenticate("local", {
  //     failureRedirect: "/auth/login",
  //     successRedirect: "/",
  //   });
}
export default AuthController;
export const authController = new AuthController();
