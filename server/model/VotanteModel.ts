import { Schema, model } from 'mongoose';
import { IVotante } from '../interfaces/VotanteInterface';

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
    }, {
      timestamps: true,
      versionKey: false
    });

    this.schema.set('toJSON', {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
      }
    });
  }

  public getModel() {
    const votante = model<IVotante>('Votante', this.schema);
    return votante;
  }
}

export const votanteModel = new VotanteSchema().getModel();
export default VotanteSchema;