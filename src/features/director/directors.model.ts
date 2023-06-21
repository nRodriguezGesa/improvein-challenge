import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TvShowEpisode } from '../shows/episodes/tv.show.episode.entity';
import { Movie } from '../movies/movie.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Director } from './director.entity';

export class BaseDirector {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: 'string',
    required: false,
    example: new Date().toLocaleDateString(),
  })
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', minLength: 1, required: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', minLength: 1, required: false })
  nationality?: string;
}

export class RelationsInfoDirector extends BaseDirector {
  @ApiProperty({ type: Movie, isArray: true })
  movies?: Movie[];

  @ApiProperty({ type: TvShowEpisode, isArray: true })
  tvShowsEpisodes?: TvShowEpisode[];
}

export class CreateDirectorDto extends OmitType(BaseDirector, ['id']) {}
export class CreateDirectorResponse extends BaseDirector {
  constructor(director: Director) {
    super();
    Object.assign(this, director);
  }
}
