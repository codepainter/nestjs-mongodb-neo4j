import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BaseSchema } from './base.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({
  collection: 'movies',
})
export class Movie extends BaseSchema {
  @Prop()
  title: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

export type MovieModel = Model<Movie>;
