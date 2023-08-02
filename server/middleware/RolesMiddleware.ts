import { Request, Response, NextFunction } from "express";
import { RoleModel } from "../model/RoleModel";
import { UsuarioModel } from "../model/UsuarioModel";

class RolesMiddleware {
    // protected isAdmin = async (req:Request, res:Response, next:NextFunction) => {
        
    // }

    protected isUser = async (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            const user = req.user;
            if (user) {
                console.log(user);
            } else {
                res.status(400).json({ error: "No tienes permisos para acceder a esta ruta"})
            }
        } else {
            res.redirect("/login")
        }
    }
}
export default RolesMiddleware;
export const rolesMiddleware = new RolesMiddleware();