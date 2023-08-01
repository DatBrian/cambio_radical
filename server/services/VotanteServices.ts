import VotanteRepository, { votanteRepository } from "../repositories/VotanteRepository";
import { verifyJWT } from "../common/FunctionsCommon";

class VotanteServices {
    private repository: VotanteRepository;

    constructor() {
        this.repository = votanteRepository;
    }

    public async getAllVotantes(): Promise<any> {
        return this.repository.getAllVotantes();
    }

    public async getVotanteByID(token: string): Promise<any> {
        const body = await verifyJWT(token);
        const id = body.id;
        return this.repository.getVotanteById(id);
    }

    public async insertVotante(token: string): Promise<string> {
        return this.repository.insertVotante(await verifyJWT(token));
    }

    public async updateVotante(token: string): Promise<any> {
        const body = await verifyJWT(token);
        const id = body.id;
        delete body.id;
        return this.repository.updateVotante(id, body);
    }

    public async deleteVotante(token: string): Promise<string> {
        const body = await verifyJWT(token);
        const id = body.id;
        return this.repository.deleteVotante(id);
    }
}

export default VotanteServices;
export const votanteServices = new VotanteServices();
