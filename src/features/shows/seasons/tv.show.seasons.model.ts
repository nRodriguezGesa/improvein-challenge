import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseTvShow } from '../tv.shows/tv.shows.model';
import { BaseTvShowEpisode } from '../episodes/tv.show.episodes.model';

export class BaseTvShowSeason {
  @ApiProperty()
  @IsNumber()
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
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  year: number;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  seasonNumber: number;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  episodesQ: number;

  @IsNumber()
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  tvShow: BaseTvShow;

  @IsArray()
  @ApiProperty({ type: BaseTvShowEpisode, isArray: true })
  episodes: BaseTvShowEpisode[];
}
