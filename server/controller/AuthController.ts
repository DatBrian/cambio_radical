/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthServices, { authServices } from "../services/AuthServices";
import { Request, Response } from "express";
import passport from "passport";

export class AuthController {
    private readonly service: AuthServices;
    constructor() {
        this.service = authServices;
    }

    public signUp = async (req:Request, res:Response) => {
        const { username, email, password, confirmPassword, roles } = req.body;

        await this.service.signUp({username, email, password, confirmPassword, roles})
        res.json("SignUp")
    }

    public signIn = passport.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/'
    })

}
export default AuthController
export const authController = new AuthController();