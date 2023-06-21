import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TvShowEpisode } from './episodes/tv.show.episode.entity';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import BaseExceptionResponse from 'src/models/base.exception.response.model';

@Injectable()
export class TvShowsRepository {
  constructor(
    @InjectRepository(TvShowEpisode)
    private tvShowEpisodeRepository: Repository<TvShowEpisode>,
  ) {}

  async getEpisodeById(id: number): Promise<TvShowEpisode> {
    try {
      return await this.tvShowEpisodeRepository
        .createQueryBuilder('episode')
        .where('episode.id = :id', { id: id })
        .leftJoinAndSelect('episode.director', 'director')
        .getOneOrFail();
    } catch (error) {
      let errorMessage: string;
      let status: number;
      if (error instanceof EntityNotFoundError) {
        errorMessage = `Episode not found: ${error}`;
        status = HttpStatus.NOT_FOUND;
      } else {
        errorMessage = `Error getting episode by id: ${error}`;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(status, errorMessage);
    }
  }
}
