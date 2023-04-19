import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { MovieDto } from './dto/movie.dto';
import { OmdbService } from '../providers/omdb/omdb.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { pick } from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly omdbService: OmdbService
  ) {}

  async getByTitle(title: string): Promise<MovieDto> {
    try {
      const cachedMovie = await this.cacheManager.get(title);

      if(cachedMovie) {
        return <MovieDto> pick(cachedMovie, ['Title', 'Year', 'Genre', 'Director', 'Actors', 'Country']);
      }

      const movie = await this.omdbService.getMovieByTitle(title);

      if(movie.Response === 'False') {
        throw new NotFoundException(`Movie with title ${title} not found`);
      }

      await this.cacheManager.set(title, movie, 3600000); // 1 hour cache
      return <MovieDto> pick(movie, ['Title', 'Year', 'Genre', 'Director', 'Actors', 'Country']);
    } catch (err) {
      throw err;
    }
  }

  async createFavorite(userId: string, title: string): Promise<Movie> {
    const movie = await this.getByTitle(title);
    const createdMovie = new this.movieModel({ ...movie, Title: movie.Title.toLowerCase(), User: userId });
    return await createdMovie.save();
  }

  async getFavoritesByUserId(userId: string): Promise<MovieDto[]> {
    const movies = await this.movieModel.find({ User: userId }).exec();

    if(!movies.length) {
      throw new NotFoundException(`No favorites found for user with id ${userId}`);
    }

    const normalizedMovies = movies.map((movie) => {
      return <MovieDto> pick(movie, ['Title', 'Year', 'Genre', 'Director', 'Actors', 'Country']);
    });

    return normalizedMovies;
  }

  async isMovieFavorite(userId: string, title: string): Promise<boolean> {
    const movie = await this.movieModel.findOne({ User: userId, Title: title.toLowerCase() }).exec();
    return !!movie;
  }
}