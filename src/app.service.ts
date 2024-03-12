import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

interface MovieResponse {
  results: Movie[];
}

interface Movie {
  id: number;
}

interface MovieImagesResponse {
  backdrops: Backdrop[];
  id: number;
  logos: any[]; 
  posters: any[];
}

interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

@Injectable()
export class MovieDbService {
  private readonly logger = new Logger(MovieDbService.name);
  private readonly apiKey: string;
  private readonly axiosConfig: AxiosRequestConfig;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.axiosConfig = {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json',
      },
    };
  }

  
  async getPopularMovies(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>('https://api.themoviedb.org/3/movie/popular', this.axiosConfig).pipe(
        catchError((error: any) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async getRandomPosterUrl(): Promise<string> {
    try {
      const popularMoviesResponse = await firstValueFrom(
        this.httpService.get<MovieResponse>('https://api.themoviedb.org/3/movie/popular', this.axiosConfig).pipe(
          catchError((error: any) => {
            this.logger.error(error.response?.data);
            throw 'An error happened!';
          }),
        ),
      );
  
      // Get a random movie from the list
      const randomMovie = popularMoviesResponse.data.results[Math.floor(Math.random() * popularMoviesResponse.data.results.length)];
  
      // Get movie images for the selected movie
      const movieImagesResponse = await firstValueFrom(
        this.httpService.get<MovieImagesResponse>(`https://api.themoviedb.org/3/movie/${randomMovie.id}/images`, this.axiosConfig).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw 'An error happened!';
          }),
        ),
      );
  
      // Get a random poster from the movie images
      const randomPoster = movieImagesResponse.data.backdrops[Math.floor(Math.random() * movieImagesResponse.data.backdrops.length)];
  
      // Construct the URL of the poster
      const posterUrl = `https://image.tmdb.org/t/p/original${randomPoster.file_path}`;
  
      return posterUrl;
    } catch (error) {
      this.logger.error('An error occurred while fetching random poster URL:', error);
      throw 'An error happened!';
    }
  }
}
