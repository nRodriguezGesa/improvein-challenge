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
import { DirectorsService } from './directors.service';
import { CreateDirectorDto, CreateDirectorResponse } from './directors.model';
import { CreateActorDto } from '../actor/actors.model';
import { Director } from './director.entity';
import BaseResponse from '../../models/base.response.model';
import BaseExceptionResponse from '../../models/base.exception.response.model';
import { ApiTagsEnum } from '../../enums/api.tags.enum';
import { AuthGuard } from '../auth/auth.guard';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @ApiExtraModels(BaseResponse, CreateDirectorResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateDirectorResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CreateDirectorResponse) },
            },
          },
        },
      ],
    },
    description: 'Directors',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiConflictResponse({
    type: BaseExceptionResponse,
    description: 'Duplicate director name',
  })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreateActorDto })
  @ApiTags(ApiTagsEnum.DIRECTORS)
  @UseGuards(AuthGuard)
  @Post()
  async createDirector(
    @Headers() headers,
    @Body() payload: CreateDirectorDto,
  ): Promise<BaseResponse<CreateDirectorResponse>> {
    const response: Director = await this.directorsService.createDirector(
      payload,
    );
    Logger.log(response);
    return new BaseResponse(
      HttpStatus.CREATED,
      'Director',
      new CreateDirectorResponse(response),
    );
  }
}
