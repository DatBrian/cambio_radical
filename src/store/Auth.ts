import {defineStore} from 'pinia'

const useAuth  = defineStore('auth',{
    state:()=>{
        return{
            token: null,
            role: null,
            baseURL: 'https://cambioradicalserver.up.railway.app/api/v1'
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
        },
        async getVotantes(){

            const uri = `${this.baseURL}/votante/all`
            const res = await fetch(uri,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `${this.token}`
                }
            });
            const response = await res.json();

            return response
        },
        async getPuestos(){
            const uri = `${this.baseURL}/puesto/all`
            const res = await fetch(uri,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json',
                    'Authorization' : `${this.token}`
                }
            });
            const response = await res.json();

            return response
        },
        async getBarrios(){
            const uri =`${this.baseURL}/barrio/all`
            const res = await fetch(uri,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json',
                    'Authorization' : `${this.token}`
                }
            });
            const response = await res.json();

            return response
        },
        async saveVotante(body:any){
            const uri = `${this.baseURL}/votante/create`
            const response = await fetch(uri,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json',
                    'Authorization' : `${this.token}`
                },
                body: JSON.stringify(body)
            });

            return response
        },
        async verifyDoc(doc:object){
            const uri = ` ${this.baseURL}/votante/verifyDoc`
            const res = await fetch(uri,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/json',
                    'Accept' : 'Application/json',
                    'Authorization' : `${this.token}`
                },
                body: JSON.stringify(doc)
            });
            const response = await res.json();

            return response
        }
    }
})

export default useAuth;