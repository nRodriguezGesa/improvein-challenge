import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  IsObject,
} from 'class-validator';
import { Director } from '../director/director.entity';
import { Actor } from '../actor/actor.entity';
import { Movie } from './movie.entity';
import { genre } from '../../enums/genres.enum';
import { BaseDirector } from '../director/directors.model';

export class BaseMovie {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    minLength: 1,
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    minLength: 25,
    required: false,
    type: 'string',
    example: 'Una emocionante aventura en el espacio exterior',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, type: 'number' })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiProperty({ example: 120, required: false, type: 'number' })
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ required: true, type: 'string', enum: genre })
  @IsString()
  @IsEnum(genre)
  genre: string;

  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  @IsNumber()
  rating: number;

  @ApiProperty({ type: Director })
  @IsObject()
  director: Director;

  @ApiProperty({ type: Actor, isArray: true })
  @IsArray()
  actors: Actor[];

  public static createBaseMovieFromCreateMovieDto(
    movie: CreateMovieDto,
    director: Director,
    actors: Actor[],
  ): BaseMovie {
    const baseMovie = new BaseMovie();
    baseMovie.actors = actors;
    baseMovie.description = movie.description;
    baseMovie.director = director;
    baseMovie.duration = movie.duration;
    baseMovie.genre = movie.genre;
    baseMovie.rating = movie.rating;
    baseMovie.title = movie.title;
    baseMovie.year = movie.year;
    return baseMovie;
  }
}

export class CreateMovieDto extends OmitType(BaseMovie, [
  'id',
  'director',
  'actors',
]) {
  @ApiProperty({ required: true, type: 'number' })
  @IsNumber()
  directorId: number;
  @ApiProperty({ required: true, type: 'number', isArray: true })
  @IsArray()
  actorsIds: number[];
}
export class CreateMovieResponse extends CreateMovieDto {
  constructor(movie: Movie) {
    super();
    Object.assign(this, movie);
  }
}

export class GetMovieResponse extends OmitType(BaseMovie, ['director']) {
  constructor(movie: Movie) {
    super();
    Object.assign(this, movie);
  }

  @ApiProperty({ type: BaseDirector })
  @IsObject()
  director: BaseDirector;
}
