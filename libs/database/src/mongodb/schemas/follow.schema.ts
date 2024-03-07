import { HydratedDocument, Model } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from './base.schema';

export type FollowDocument = HydratedDocument<Follow>;

@Schema({
  collection: 'follows',
})
export class Follow extends BaseSchema {
  @Prop({ index: true })
  followerId: string;

  @Prop({ index: true })
  followingId: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export type FollowModel = Model<Follow>;
