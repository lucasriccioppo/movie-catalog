import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
}