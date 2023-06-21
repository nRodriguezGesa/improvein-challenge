import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto, CreateActorResponse } from './actors.model';
import { Actor } from './actor.entity';
import BaseResponse from '../../models/base.response.model';
import BaseExceptionResponse from '../../models/base.exception.response.model';
import { ApiTagsEnum } from '../../enums/api.tags.enum';
import { AuthGuard } from '../auth/auth.guard';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @ApiExtraModels(BaseResponse, CreateActorResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CreateActorResponse) },
            },
          },
        },
      ],
    },
    description: 'Actors',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiConflictResponse({
    type: BaseExceptionResponse,
    description: 'Duplicate actor name',
  })
  @ApiBearerAuth('access-token')
  @ApiTags(ApiTagsEnum.ACTORS)
  @ApiBody({ type: CreateActorDto })
  @UseGuards(AuthGuard)
  @Post()
  async createActor(
    @Headers() headers,
    @Body() payload: CreateActorDto,
  ): Promise<BaseResponse<CreateActorResponse>> {
    const response: Actor = await this.actorsService.createActor(payload);
    Logger.log(response);
    return new BaseResponse(
      HttpStatus.CREATED,
      'Actor',
      new CreateActorResponse(response),
    );
  }
}
