import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { GetMoviesQueryModel } from './movies.query.model';
import { BaseMovie } from './movies.model';
import BaseExceptionResponse from 'src/models/base.exception.response.model';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async getMovies(filters: GetMoviesQueryModel): Promise<Movie[]> {
    let query = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.actors', 'actors');
    if (filters.title) {
      query = query.andWhere('movie.title = :title', { title: filters.title });
    }
    if (filters.year) {
      query = query.andWhere('movie.year = :year', { year: filters.year });
    }
    if (filters.director) {
      query = query.andWhere('director.name = :director', {
        director: filters.director,
      });
    }
    if (filters.genre) {
      query = query.andWhere('movie.genre = :genre', {
        genre: filters.genre,
      });
    }
    try {
      return await query.limit(filters.limit).offset(filters.offset).getMany();
    } catch (error) {
      const errorMessage = `Error getting movies: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }

  async createMovie(movie: BaseMovie): Promise<Movie> {
    try {
      return await this.movieRepository.save(movie);
    } catch (error) {
      const errorMessage = `Error creating movie: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }
}
