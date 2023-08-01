import { Schema, model } from 'mongoose';
import { IVotante } from '../../interfaces/VotanteInterface';

class VotanteSchema {
  private schema: Schema<IVotante>;

  constructor() {
    this.schema = new Schema<IVotante>({
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
    return model<IVotante>('Votante', this.schema);
  }
}

export const votanteModel = new VotanteSchema().getModel();
export default VotanteSchema;