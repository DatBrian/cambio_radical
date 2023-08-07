import { Router } from "express";
import RouterCommon from "../common/RouterCommon";
import VotanteController, {
  votanteController,
} from "../controller/VotanteController";

class VotanteRoutes extends RouterCommon<VotanteController> {
  public path: string;
  public router: Router;
  public controller: VotanteController;

  constructor() {
    super(VotanteController);
    this.path = "/votante";
    this.router = Router();
    this.controller = votanteController;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}/all`, this.controller.getAllVotante);
    this.router.get(`${this.path}/id`, (req, res) => {
      this.controller.getVotanteById(req, res);
    });
    this.router.post(`${this.path}/create`, (req, res) => {
      this.controller.insertVotante(req, res);
    });
    this.router.post(`${this.path}/verifyDoc`, (req, res) => {
      this.controller.verifyDoc(req, res);
    });
    this.router.put(`${this.path}/update`, (req, res) => {
      this.controller.updateVotante(req, res);
    });
    this.router.delete(`${this.path}/delete`, (req, res) => {
      this.controller.deleteVotante(req, res);
    });
  }
}

export const votanteRoutes = new VotanteRoutes();
