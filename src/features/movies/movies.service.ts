import { HttpStatus, Injectable } from '@nestjs/common';
import { GetMoviesQueryModel } from './movies.query.model';
import { MoviesRepository } from './movies.repository';
import { BaseMovie, CreateMovieDto } from './movies.model';
import { ActorsService } from '../actor/actors.service';
import { DirectorsService } from '../director/directors.service';
import { Director } from '../director/director.entity';
import { Actor } from '../actor/actor.entity';
import { Movie } from './movie.entity';
import BaseExceptionResponse from '../../models/base.exception.response.model';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
  ) {}

  async getMovies(filters: GetMoviesQueryModel): Promise<Movie[]> {
    return await this.moviesRepository.getMovies(filters);
  }

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    const actors: Actor[] = await this.actorsService.getActorByIds(
      movie.actorsIds,
    );
    if (actors.length !== movie.actorsIds.length) {
      throw new BaseExceptionResponse(
        HttpStatus.BAD_REQUEST,
        'Error finding actors',
      );
    }
    const director: Director = await this.directorsService.getDirectorById(
      movie.directorId,
    );
    if (!director) {
      throw new BaseExceptionResponse(
        HttpStatus.BAD_REQUEST,
        'Error finding director',
      );
    }
    const newMovie: BaseMovie = BaseMovie.createBaseMovieFromCreateMovieDto(
      movie,
      director,
      actors,
    );
    return await this.moviesRepository.createMovie(newMovie);
  }
}
