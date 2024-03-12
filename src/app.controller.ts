import { Controller, Get } from '@nestjs/common';
import { MovieDbService } from './app.service';

@Controller('movies')
export class AppController {
  constructor(private readonly movieDbService: MovieDbService) {}

  @Get('popular')
  async getPopularMovies(): Promise<any> {
    return this.movieDbService.getPopularMovies();
  }

  @Get('poster')
  async getRandomPosterUrl(): Promise<any> {
    return this.movieDbService.getRandomPosterUrl();
  }
}
