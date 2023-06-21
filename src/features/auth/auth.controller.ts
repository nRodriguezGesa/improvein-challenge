import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import BaseResponse from '../../models/base.response.model';
import { AuthResponse, InputUserDto, UserResponse } from './users.model';
import BaseExceptionResponse from '../../models/base.exception.response.model';
import { ApiTagsEnum } from '../../enums/api.tags.enum';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExtraModels(BaseResponse, UserResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              $ref: getSchemaPath(UserResponse),
            },
          },
        },
      ],
    },
    description: 'User created successfully',
  })
  @ApiConflictResponse({
    type: BaseExceptionResponse,
    description: 'Duplicate mail',
  })
  @ApiTags(ApiTagsEnum.LOGIN)
  @ApiBody({ type: InputUserDto })
  @Post('/register')
  async registerUser(
    @Body() inputUserDto: InputUserDto,
  ): Promise<BaseResponse<UserResponse>> {
    const response: UserResponse = await this.authService.registerUser(
      inputUserDto,
    );
    Logger.log(JSON.stringify(response));
    return new BaseResponse(HttpStatus.CREATED, 'User created', response);
  }

  @ApiExtraModels(BaseResponse, AuthResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              $ref: getSchemaPath(AuthResponse),
            },
          },
        },
      ],
    },
    description: 'User created successfully',
  })
  @ApiNotFoundResponse({
    type: BaseExceptionResponse,
    description: 'Mail not found',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Incorrect password',
  })
  @ApiTags(ApiTagsEnum.LOGIN)
  @ApiBody({ type: InputUserDto })
  @Post()
  async login(
    @Body() inputUserDto: InputUserDto,
  ): Promise<BaseResponse<AuthResponse>> {
    const response = await this.authService.login(inputUserDto);
    Logger.log(JSON.stringify(response));
    return new BaseResponse(HttpStatus.ACCEPTED, 'Login successfull', response);
  }
}
