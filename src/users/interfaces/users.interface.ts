import { Document } from 'mongoose';

export interface IUsers extends Document {
  readonly cod: string;
  readonly username: string;
  // readonly password: string;
  // readonly email: string;
  // readonly dateofbirth: Date;
  readonly address: Array<string>;
  readonly githubusername: string;
}
