import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDirector } from '../../director/directors.model';
import { BaseActor } from '../../actor/actors.model';
import { TvShowEpisode } from './tv.show.episode.entity';
import { TvShowSeason } from '../seasons/tv.show.season.entity';
import { Director } from '../../director/director.entity';
import { Actor } from '../../actor/actor.entity';

export class BaseTvShowEpisode {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty({ minLength: 1, required: true, type: 'string' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    minLength: 25,
    required: false,
    type: 'string',
    example: 'Una emocionante aventura en el espacio exterior',
  })
  description: string;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  episode_number: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  year: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 120, required: false, type: 'number' })
  duration: number;

  @IsDecimal()
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  season: TvShowSeason;

  @ApiProperty({ type: () => BaseDirector })
  director: Director;

  @IsArray()
  @ApiProperty({ type: () => BaseActor, isArray: true })
  actors: Actor[];
}

export class GetEpisodeResponse extends OmitType(BaseTvShowEpisode, [
  'actors',
  'season',
] as const) {
  public static createGetEpisodeResponse(
    episode: TvShowEpisode,
  ): GetEpisodeResponse {
    const response = new BaseTvShowEpisode();
    response.description = episode.description;
    response.director = episode.director;
    response.duration = episode.duration;
    response.episode_number = episode.episode_number;
    response.id = episode.id;
    response.rating = episode.rating;
    response.title = episode.title;
    response.year = episode.year;
    return response;
  }
}
