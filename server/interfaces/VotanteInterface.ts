import { Document } from 'mongoose';

export interface IVotante extends Document {
  name: string;
  lider: string;
  doc: number;
  nacimiento: Date;
  telefono: number;
  direccion: string;
  barrio: string;
  comuna: number;
  email: string;
  ocupacion: string;
  RS: Array<string>;
  PuestoVotacion: string;
  MesaVotacion: number;
  compromiso: string;
}