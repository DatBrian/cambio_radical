import VotanteServices, { votanteServices } from "../services/VotanteServices";
import { Request, Response } from "express";

export class VotanteController {
    private readonly service: VotanteServices;
    private cookie: string;
    constructor() {
        this.service = votanteServices;
        this.cookie = 'token';
    }

    public getAllVotante = async (_req: Request, res: Response) => {
        try {
            const Votantes = await this.service.getAllVotantes();
            res.json(Votantes);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las categorías, revise la consola para más información' });

        }
    }

    public getVotanteById = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const Votante = await this.service.getVotanteByID(token);
            res.clearCookie(this.cookie);
            res.json(Votante);
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la categoría, revise la consola para más información' });
        }
    }

    public insertVotante = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const newVotante = await this.service.insertVotante(token);
            res.clearCookie(this.cookie);
            res.json(newVotante);
        } catch (error) {
            console.error('Error al insertar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al insertar la categoría, revise la consola para más información' });
        }
    }

    public updateVotante = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const updated = await this.service.updateVotante(token);
            res.clearCookie(this.cookie);
            res.json(updated)
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al actualizar la categoría, revise la consola para más información' });
        }
    }

    public deleteVotante = async (req: Request, res: Response) => {
        try {
            const token = await req.cookies.token;
            const deleted = await this.service.deleteVotante(token);
            res.clearCookie(this.cookie)
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar la categoría, revise la consola para más información' });
        }
    }
}
export default VotanteController
export const votanteController = new VotanteController();