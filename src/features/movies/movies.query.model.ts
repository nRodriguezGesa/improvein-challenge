import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFiltersQuery } from '../../models/base.filters.query.model';
import { genre } from '../../enums/genres.enum';

export class GetMoviesQueryModel extends BaseFiltersQuery {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({ type: 'number', required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  year?: number;
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  director?: string;
  @ApiProperty({ type: 'string', enum: genre, required: false })
  @IsOptional()
  @IsEnum(genre)
  genre?: string;
}
