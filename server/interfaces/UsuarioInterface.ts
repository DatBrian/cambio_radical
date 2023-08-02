import { Document } from 'mongoose';

export interface IUsuario extends Document {
  username: string;
  email: string;
  password: string;
  roles: any;
}