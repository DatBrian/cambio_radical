import QueriesCommon from "../common/QueriesCommon";
import { IUsuario } from "../interfaces/UsuarioInterface";
import { Model } from 'mongoose';
import { UsuarioModel } from '../model/UsuarioModel';

class AuthRepository extends QueriesCommon<IUsuario> {

    constructor(protected model: Model<IUsuario> = UsuarioModel) {
        super(model);
    }

    public async signUp(body:any) {
        try {
            await this.insert(body);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw new Error("Error al registrar el usuario");
        }
    }

}

export default AuthRepository;
export const authRepository = new AuthRepository();
