import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class GetMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
}