import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/jwt.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/movie.entity';
import { Actor } from './actor/actor.entity';
import { Director } from './director/director.entity';
import { TvShow } from './shows/tv.shows/tv.show.entity';
import { TvShowEpisode } from './shows/episodes/tv.show.episode.entity';
import { TvShowSeason } from './shows/seasons/tv.show.season.entity';
import { ActorsModule } from './actor/actors.module';
import { DirectorsModule } from './director/directors.module';
import { MoviesModule } from './movies/movies.module';
import { TvShowsModule } from './shows/tv.shows.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Movie,
        Actor,
        Director,
        TvShow,
        TvShowEpisode,
        TvShowSeason,
        User,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ActorsModule,
    DirectorsModule,
    MoviesModule,
    TvShowsModule,
  ],
})
export class CinematographyModule {}
