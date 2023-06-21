import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';
import { DirectorsModule } from '../director/directors.module';
import { ActorsModule } from '../actor/actors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), DirectorsModule, ActorsModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
