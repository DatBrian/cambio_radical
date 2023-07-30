import { Document } from 'mongoose';

export interface IUsuario extends Document {
    name: string;
    nacimiento: Date;
    ubicacion: string;
    lider: string;
}
