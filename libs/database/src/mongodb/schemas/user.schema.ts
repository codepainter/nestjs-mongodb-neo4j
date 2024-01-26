import { HydratedDocument, Model } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from './base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
})
export class User extends BaseSchema {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;
