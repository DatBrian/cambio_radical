import {defineStore} from 'pinia'

const useAuth  = defineStore('auth',{
    state:()=>{
        return{
            token: null,
            role: null,
            baseURL: 'http://localhost:5000/api/v1'
        }
    },
    actions: {
        async register(username:string, email:string, role:string, password:string){
            const uri = `${this.baseURL}/auth/signup`;
            const res = await fetch(uri,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json',
                    'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjRkNTRlMGI0ZjNmYzZmMjA3ZTY2MTI1In0sImlhdCI6MTY5MTg0NTcyNiwiZXhwIjoxNjkxOTMyMTI2fQ.iEZ-MVqU9L6Ap0YO-uR-ZmJ2JwDCWWo2V0JGrjc_WcQ'
                },
                body:JSON.stringify({
                    'username':username,
                    'email':email,
                    'role': role,
                    'password':password
                })
            })
            const response = await res.json();
            if(response.status !== "Insertado correctamente :D"){
                this.token = null;
                return false
            }else{
                this.token = response.token
                return true
            }
        },
        async login(username:string, password:string){
            const uri = `${this.baseURL}/auth/signin`;
            const res = await fetch(uri,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json'
                },
                body:JSON.stringify({
                    'username':username,
                    'password':password
                })
            })
            const response = await res.json();
            if(response.status !== "Usuario encontrado :D"){
                this.token = null;
                return false
            }else{
                this.token = response.token
                this.role = response.role
                return true
            }
        }
    }
})

export default useAuth;