import { IsNotEmpty, MaxLength } from 'class-validator';

export class GetMovieDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
}