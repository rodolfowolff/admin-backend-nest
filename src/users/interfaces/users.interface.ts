import { Document } from 'mongoose';

export interface IUsers extends Document {
  readonly cod: string;
  readonly username: string;
  // readonly password: string;
  // readonly email: string;
  readonly dateofbirth: Date;
  readonly cep: string;
  readonly uf: string;
  readonly localidade: string;
  readonly bairro: string;
  readonly logradouro: string;
  readonly numero: string;
  readonly complemento: string;
  readonly githubusername: string;
}
