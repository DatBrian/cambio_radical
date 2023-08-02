import { Router } from "express";
import AuthController, { authController } from "../controller/AuthController";
import passport from "passport";

class AuthRoutes {
    public path: string;
    public router: Router;
    protected controller:AuthController;

    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.controller = authController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.path}/signup`,
            (req, res) => {
            this.controller.signUp(req, res)
        });
        this.router.post(`${this.path}/login`,
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login'
            }));
    }
}

export const authRoutes = new AuthRoutes();