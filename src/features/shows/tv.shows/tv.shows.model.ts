import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseTvShowSeason } from '../seasons/tv.show.seasons.model';
import { genre } from '../../../enums/genres.enum';

export class BaseTvShow {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ minLength: 1, required: true, type: 'string' })
  @IsString()
  title: string;

  @ApiProperty({
    minLength: 25,
    required: false,
    type: 'string',
    example: 'Una emocionante aventura en el espacio exterior',
  })
  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  seasonsQ: number;

  @IsString()
  @IsEnum(genre)
  @ApiProperty({ required: true, type: 'string', enum: genre })
  genre: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  beginYear: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  endYear: number;

  @IsNumber()
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  @IsArray()
  @ValidateNested()
  @ApiProperty({ type: BaseTvShowSeason, isArray: true })
  seasons: BaseTvShowSeason[];
}
