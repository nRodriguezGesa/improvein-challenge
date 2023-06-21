import {
  Controller,
  Get,
  Param,
  Headers,
  Logger,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TvShowsService } from './tv.shows.service';
import BaseResponse from '../../models/base.response.model';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import BaseExceptionResponse from '../../models/base.exception.response.model';
import { ApiTagsEnum } from '../../enums/api.tags.enum';
import { TvShowEpisode } from './episodes/tv.show.episode.entity';
import { GetEpisodeResponse } from './episodes/tv.show.episodes.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tv-shows')
export class TvShowsController {
  constructor(private readonly showsService: TvShowsService) {}

  @ApiExtraModels(BaseResponse, GetEpisodeResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              $ref: getSchemaPath(GetEpisodeResponse),
            },
          },
        },
      ],
    },
    description: 'Episode',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    allowEmptyValue: false,
    required: true,
  })
  @ApiBearerAuth('access-token')
  @ApiTags(ApiTagsEnum.SHOWS)
  @UseGuards(AuthGuard)
  @Get('episodes/:id')
  async getTvShowById(
    @Headers() headers,
    @Param('id') id: number,
  ): Promise<BaseResponse<GetEpisodeResponse>> {
    const response: TvShowEpisode = await this.showsService.getEpisodeById(id);
    Logger.log(response);
    return new BaseResponse(
      HttpStatus.OK,
      'Episode',
      GetEpisodeResponse.createGetEpisodeResponse(response),
    );
  }
}
