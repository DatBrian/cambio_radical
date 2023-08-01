import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import ValidateMiddlewareDTO from "../middleware/ValidateMiddlewareDTO";
import VotanteController, { votanteController } from "../controller/VotanteController";
import EncryptDataMiddleware from "../middleware/EncryptDataMiddleware";

class VotanteRoutes extends RouterCommon<VotanteController, ValidateMiddlewareDTO>{
    public path: string;
    public router: Router;
    public controller: VotanteController;

    constructor() {
        super(VotanteController, ValidateMiddlewareDTO);
        this.path = '/votante';
        this.router = Router();
        this.controller = votanteController;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.controller.getAllVotante)
        this.router.get(`${this.path}/id`,
            EncryptDataMiddleware.execute,
            (req, res) => {
                this.controller.getVotanteById(req, res);
            });
        this.router.post(`${this.path}/create`,
            EncryptDataMiddleware.execute,
            (req, res) => {
                this.controller.insertVotante(req, res);
            });
        this.router.put(`${this.path}/update`,
            EncryptDataMiddleware.execute,
            (req, res) => {
                this.controller.updateVotante(req, res)
            });
        this.router.delete(`${this.path}/delete`,
            EncryptDataMiddleware.execute,
            (req, res) => {
                this.controller.deleteVotante(req, res);
            }
        )
    }
}

export const votanteRoutes = new VotanteRoutes();