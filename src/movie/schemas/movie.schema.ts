import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  Title: string;

  @Prop()
  Year: number;

  @Prop()
  Genre: string;

  @Prop()
  Director: string;

  @Prop()
  Actors: string;

  @Prop()
  Country: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  User: User;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);