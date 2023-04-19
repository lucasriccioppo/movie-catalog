import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Movie } from './schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetMovieDto } from './dto/getMovie.dto';
import { CreateFavoriteDto } from './dto/createFavorite.dto';
import { AuthGuard } from '../providers/authentication/auth.guard';
import { User } from '../decorators/user.decorator';
import { UserDecoratorDto } from 'src/decorators/dto/userDecorator.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiBody({ description: 'Search for a movie by title' })
  @Get('single/:title')
  async getByTitle(@Param() movie: GetMovieDto): Promise<MovieDto> {
    return await this.movieService.getByTitle(movie.title);
  }

  @ApiBody({ description: 'Create a favorite movie' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createFavorite(@User() user: UserDecoratorDto, @Body() movie: CreateFavoriteDto): Promise<Movie> {
    const userId = user.userId;
    return await this.movieService.createFavorite(userId, movie.title);
  }

  @ApiBody({ description: 'Get a list of the favorites movies from this user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavoritesByUserId(@User() user: UserDecoratorDto): Promise<MovieDto[]> {
    const userId = user.userId;
    return await this.movieService.getFavoritesByUserId(userId);
  }

  @ApiBody({ description: 'Check if a movie is favorite for this user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('isFavorite')
  async isMovieFavorite(@User() user: UserDecoratorDto, @Body() movie: GetMovieDto): Promise<boolean> {
    const userId = user.userId;
    return await this.movieService.isMovieFavorite(userId, movie.title);
  }
}
