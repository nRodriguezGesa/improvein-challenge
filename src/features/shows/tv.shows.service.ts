import { Injectable } from '@nestjs/common';
import { ActorsService } from '../actor/actors.service';
import { DirectorsService } from '../director/directors.service';
import { TvShowsRepository } from './tv.shows.repository';
import { TvShowEpisode } from './episodes/tv.show.episode.entity';

@Injectable()
export class TvShowsService {
  constructor(
    private readonly tvShowsRepository: TvShowsRepository,
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
  ) {}

  async getEpisodeById(id: number): Promise<TvShowEpisode> {
    return await this.tvShowsRepository.getEpisodeById(id);
  }
}
