import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  CreateMovieDto,
  CreateMovieResponse,
  GetMovieResponse,
} from './movies.model';
import { Movie } from './movie.entity';
import BaseResponse from '../../models/base.response.model';
import { ApiTagsEnum } from '../../enums/api.tags.enum';
import BaseExceptionResponse from '../../models/base.exception.response.model';
import { genre } from '../../enums/genres.enum';
import { GetMoviesQueryModel } from './movies.query.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiExtraModels(BaseResponse, GetMovieResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(GetMovieResponse) },
            },
          },
        },
      ],
    },
    description: 'Movies',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @ApiTags(ApiTagsEnum.MOVIES)
  @ApiQuery({
    name: 'title',
    required: false,
    explode: false,
    type: String,
  })
  @ApiQuery({
    name: 'year',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'director',
    required: false,
    explode: false,
    type: String,
  })
  @ApiQuery({
    name: 'genre',
    required: false,
    explode: false,
    type: String,
    enum: genre,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    explode: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    explode: false,
    type: Number,
  })
  @UseGuards(AuthGuard)
  @Get()
  async getMovies(
    @Headers() headers,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    filters: GetMoviesQueryModel,
  ): Promise<BaseResponse<GetMovieResponse[]>> {
    const movies: Movie[] = await this.moviesService.getMovies(filters);

    const response: GetMovieResponse[] = [];
    movies.forEach((movie) => {
      response.push(new GetMovieResponse(movie));
    });
    Logger.log(response);
    return new BaseResponse(HttpStatus.OK, 'Movies', response);
  }

  @ApiExtraModels(BaseResponse, CreateMovieResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CreateMovieResponse) },
            },
          },
        },
      ],
    },
    description: 'Movies',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    type: BaseExceptionResponse,
    description: 'Director or Actors not found',
  })
  @ApiBearerAuth('access-token')
  @ApiTags(ApiTagsEnum.MOVIES)
  @ApiBody({ type: CreateMovieDto })
  @UseGuards(AuthGuard)
  @Post()
  async CreateMovie(
    @Headers() headers,
    @Body() payload: CreateMovieDto,
  ): Promise<BaseResponse<CreateMovieResponse>> {
    const response: Movie = await this.moviesService.createMovie(payload);
    Logger.log(response);
    return new BaseResponse(
      HttpStatus.OK,
      'Movies',
      new CreateMovieResponse(response),
    );
  }
}
