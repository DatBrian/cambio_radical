import VotanteServices, { votanteServices } from "../services/VotanteServices";
import { Request, Response } from "express";

export class VotanteController {
    private readonly service: VotanteServices;
    constructor() {
        this.service = votanteServices;
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
            const body = await req.body;
            const Votante = await this.service.getVotanteByID(body);
            res.json(Votante);
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la categoría, revise la consola para más información' });
        }
    }

    public insertVotante = async (req: Request, res: Response) => {
        try {
            const body = await req.body;
            const newVotante = await this.service.insertVotante(body);
            res.json(newVotante);
        } catch (error) {
            console.error('Error al insertar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al insertar la categoría, revise la consola para más información' });
        }
    }

    public updateVotante = async (req: Request, res: Response) => {
        try {
            const body = await req.body;
            const updated = await this.service.updateVotante(body);
            res.json(updated)
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al actualizar la categoría, revise la consola para más información' });
        }
    }

    public deleteVotante = async (req: Request, res: Response) => {
        try {
            const body = await req.body;
            const deleted = await this.service.deleteVotante(body);
            res.json(deleted)
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar la categoría, revise la consola para más información' });
        }
    }
}
export default VotanteController
export const votanteController = new VotanteController();