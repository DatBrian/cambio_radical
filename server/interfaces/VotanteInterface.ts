import { Document } from 'mongoose';

export interface IVotante extends Document {
  name: string;
  nacimiento: Date;
  ubicacion: string;
  lider: string;
}