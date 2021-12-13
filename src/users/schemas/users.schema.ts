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
  githubusername: string;

  @Prop()
  address: Array<string>;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
