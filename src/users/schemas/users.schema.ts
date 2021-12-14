import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ unique: true })
  cod: string;

  @Prop()
  username: string;

  // @Prop()
  // password: string;

  // @Prop()
  // email: string;
  
  @Prop()
  dateofbirth: Date;

  @Prop()
  cep: string;

  @Prop()
  uf: string;

  @Prop()
  localidade: string;

  @Prop()
  bairro: string;

  @Prop()
  logradouro: string;

  @Prop()
  numero: string;

  @Prop()
  complemento: string;

  @Prop()
  githubusername: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
