import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BadGatewayException } from '@nestjs/common/exceptions';
import { firstValueFrom } from 'rxjs';

const {
  OMDB_URL,
  OMDB_KEY
} = process.env;

@Injectable()
export class OmdbService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieByTitle(title: string) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${OMDB_URL}/?apikey=${OMDB_KEY}&t=${title}`))

      return response.data;
   } catch (err) {
      console.log(`Error getting data from omdb. Error => ${err}`);
      throw new BadGatewayException('Error getting movie data');
    }
  }
}