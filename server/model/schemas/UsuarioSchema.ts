import { Schema, model } from 'mongoose';
import { IUsuario } from '../../interfaces/UsuarioInterface';

class UsuarioSchemaClass {
    private schema: Schema<IUsuario>;

    constructor() {
        this.schema = new Schema<IUsuario>({
            name: {
                type: String,
                required: true,
                trim: true
            },
            nacimiento: {
                type: Date,
                required: true,
                trim: true
            },
            ubicacion: {
                type: String,
                required: true,
                trim: true
            },
            lider: {
                type: String,
                required: true,
                trim: true
            }
        });
    }

    public getModel() {
        return model<IUsuario>('Usuario', this.schema);
    }
}

const UsuarioModel = new UsuarioSchemaClass().getModel();

export default UsuarioModel;