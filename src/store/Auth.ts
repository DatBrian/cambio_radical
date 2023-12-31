import { defineStore } from "pinia";

const useAuth = defineStore("auth", {
    state: () => {
        return {
            total: "",
            token: null,
            role: null,
            votantes: [],
            baseURL: 'https://cambioradicalserver.up.railway.app/api/v1'
            //  baseURL: "http://localhost:5000/api/v1",
        };
    },
    actions: {
        async register(
            username: string,
            email: string,
            role: string,
            password: string
        ) {
            const uri = `${this.baseURL}/auth/signup`;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    role: role,
                    password: password,
                }),
            });
            const response = await res.json();
            if (response.status !== "Insertado correctamente :D") {
                this.token = null;
                return false;
            } else {
                this.token = response.token;
                return true;
            }
        },
        async login(username: string, password: string) {
            const uri = `${this.baseURL}/auth/signin`;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const response = await res.json();
            if (response.status !== "Usuario encontrado :D") {
                this.token = null;
                return false;
            } else {
                this.token = response.token;
                this.role = response.role;
                return true;
            }
        },
        async getAllVotantes() {
            const uri = `${this.baseURL}/votante/all`;
            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();
            this.votantes = response;
        },
        async getVotantes(page: any) {
            const uri = `${this.baseURL}/votante/filter?page=${page}`;
            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();
            const data = {
                docs: response.docs,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                totalPages: response.totalPages,
                limit: response.limit,
            };

            await data.docs.forEach((item) => {
                if(item.nacimiento){
                    item.nacimiento = item.nacimiento.split("T")[0];
                }

                delete item.updatedAt;
            })
            this.votantes = data.docs;
            return data;
        },
        async getPuestos() {
            const uri = `${this.baseURL}/puesto/all`;
            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();

            return response;
        },
        async getBarrios() {
            const uri = `${this.baseURL}/barrio/all`;
            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();

            return response;
        },
        async getLideres() {
            const uri = `${this.baseURL}/votante/lideres`;
            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();
            return response;
        },
        async saveVotante(body: any) {
            const uri = `${this.baseURL}/votante/create`;
            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(body),
            });

            return response;
        },
        async saveBarrio(body: any) {
            const uri = `${this.baseURL}/barrio/create`;
            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(body),
            });

            return response;
        },
        async savePuesto(body: any) {
            const uri = `${this.baseURL}/puesto/create`;
            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(body),
            });

            return response;
        },
        async updateVotante(body: any) {
            const uri = `${this.baseURL}/votante/update`;
            await fetch(uri, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(body),
            });
        },
        async deleteVotante(body: any) {
            const uri = `${this.baseURL}/votante/delete`;
            await fetch(uri, {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(body),
            });
        },
        async verifyBarrio(barrio: any) {
            const uri = `${this.baseURL}/barrio/verifyBarrio`;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(barrio),
            });
            const response = await res.json();

            return response;
        },
        async verifyPuesto(puesto: any) {
            const uri = `${this.baseURL}/puesto/verifyPuesto  `;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(puesto),
            });
            const response = await res.json();

            return response;
        },
        async verifyDoc(doc: object) {
            const uri = `${this.baseURL}/votante/verifyDoc`;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
                body: JSON.stringify(doc),
            });
            const response = await res.json();

            return response;
        },
        async getCount(filter?: any) {
            const uri: string = filter
                ? `${this.baseURL}/votante/count/${filter.type}/${filter.value}`
                : `${this.baseURL}/votante/count`;

            const res = await fetch(uri, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application/json",
                    Authorization: `${this.token}`,
                },
            });
            const response = await res.json();
            this.total = await response;
        },
        async getVotantesF(query: any) {
            const uri = `${this.baseURL}/votante/filter`;
            const res = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Accept: "Application / json",
                    Authorization: `${useAuth().token}`,
                },
                body: JSON.stringify({ query }),
            });

            return await res.json();
        },
    },
});

export default useAuth;
