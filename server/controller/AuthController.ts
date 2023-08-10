/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthServices, { authServices } from "../services/AuthServices";
import { Request, Response } from "express";
// import passport from "passport";

export class AuthController {
  private readonly service: AuthServices;
  constructor() {
    this.service = authServices;
  }

  public signUp = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    const response: any = await this.service.signUp({
      username,
      password,
      role,
    });

    res.json(response);
  };

  public signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.service.signIn({ username, password });
    const response = {
      status: "Usuario encontrado :D",
      token: token,
    };
    res.json(response);
  };
}
export default AuthController;
export const authController = new AuthController();
