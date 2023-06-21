import { Module } from '@nestjs/common';
import { DirectorsModule } from '../director/directors.module';
import { ActorsModule } from '../actor/actors.module';
import { TvShow } from './tv.shows/tv.show.entity';
import { TvShowSeason } from './seasons/tv.show.season.entity';
import { TvShowEpisode } from './episodes/tv.show.episode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShowsRepository } from './tv.shows.repository';
import { TvShowsService } from './tv.shows.service';
import { TvShowsController } from './tv.show.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvShow, TvShowSeason, TvShowEpisode]),
    DirectorsModule,
    ActorsModule,
  ],
  controllers: [TvShowsController],
  providers: [TvShowsRepository, TvShowsService],
})
export class TvShowsModule {}
