import { User } from '../../user/schemas/user.schema';

export class MovieDto {
  Title: string;
  Year: number;
  Genre: string;
  Director: string;
  Actors: string;
  Country: string;
  User?: User
}