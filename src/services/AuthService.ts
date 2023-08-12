import { ref, Ref } from "vue";

class AuthService {

private jwt:Ref<string>;
private error:Ref<string>;

  constructor() {
    this.jwt = ref("");
    this.error = ref("");
  }

  getJwt():Ref<string> {
    return this.jwt;
  }

  getError():Ref<string>{
    return this.error;
  }

  async login(username:string, password:string):Promise<boolean> {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signin", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const response = await res.json();

      if(response.status !== "Usuario encontrado :D"){
        this.error.value = "Login Failed"
        return false
      }else if(response.token[0] === "Contraseña Incorrecta"){
        this.error.value = "Login Failed"
        return false
      }

      this.jwt.value = response.token;
      return true

    } catch (error) {
        this.error.value = "Login Failed"
          return false;
    }
  }
}
export default AuthService;