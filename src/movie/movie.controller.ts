import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Movie } from './schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { ApiBearerAuth, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { GetMovieDto } from './dto/getMovie.dto';
import { CreateFavoriteDto } from './dto/createFavorite.dto';
import { AuthGuard } from '../providers/authentication/auth.guard';
import { User } from '../decorators/user.decorator';
import { UserDecoratorDto } from 'src/decorators/dto/userDecorator.dto';
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiParam({
    name: 'title',
    required: true,
    description: 'Movie title',
    example: 'Batman'
  })
  @Get('single/:title')
  async getByTitle(@Param() movie: GetMovieDto): Promise<MovieDto> {
    return await this.movieService.getByTitle(movie.title);
  }

  @ApiBody({
    schema: {
        properties: {
          title: {
            type: 'string',
            example: 'Batman'
          }
        }
      }
    })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createFavorite(@User() user: UserDecoratorDto, @Body() movie: CreateFavoriteDto): Promise<Movie> {
    const userId = user.userId;
    return await this.movieService.createFavorite(userId, movie.title);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavoritesByUserId(@User() user: UserDecoratorDto): Promise<MovieDto[]> {
    const userId = user.userId;
    return await this.movieService.getFavoritesByUserId(userId);
  }

  @ApiParam({
    name: 'title',
    required: true,
    description: 'Movie title',
    example: 'Batman'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('isFavorite/:title')
  async isMovieFavorite(@User() user: UserDecoratorDto, @Param() movie: GetMovieDto): Promise<boolean> {
    const userId = user.userId;
    return await this.movieService.isMovieFavorite(userId, movie.title);
  }
}
