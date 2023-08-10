import { UsuarioModel } from "../model/UsuarioModel";
import AuthRepository, { authRepository } from "../repositories/AuthRepository";

class AuthServices {
  private repository: AuthRepository;

  constructor() {
    this.repository = authRepository;
  }

  public async signUp(body: any) {
    const errors = [];
    const password = body.password;
    const username = await UsuarioModel.findOne({ username: body.username });

    if (password.length < 5) {
      errors.push({
        text: "La contraseña debe tener un mínimo de 5 caracteres",
      });
    }
    if (username) {
      errors.push({ text: "El usuario ya está en uso" });
    }
    if (errors.length > 0) {
      return errors;
    } else {
      const encryptedPassword =
        await UsuarioModel.schema.methods.encryptPassword(password);
      body.password = encryptedPassword;
      const newUser = await this.repository.signUp(body);
      return newUser;
    }
  }
}

export default AuthServices;
export const authServices = new AuthServices();
