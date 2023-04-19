import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { MovieSchema } from './schemas/movie.schema';
import { OmdbService } from 'src/providers/omdb/omdb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    HttpModule
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    OmdbService
  ],
})
export class MovieModule {}
