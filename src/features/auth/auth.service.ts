import { Injectable, HttpStatus } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, InputUserDto, UserResponse } from './users.model';
import PasswordHandler from '../../utils/password.handler';
import { User } from './user.entity';
import BaseExceptionResponse from '../../models/base.exception.response.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(inputUserDto: InputUserDto): Promise<UserResponse> {
    inputUserDto.password = await PasswordHandler.hashPassword(
      inputUserDto.password,
    );
    const user: User = await this.userRepository.findUser(inputUserDto);
    if (user !== null) {
      throw new BaseExceptionResponse(HttpStatus.CONFLICT, 'Duplicate mail');
    }
    return new UserResponse(
      await this.userRepository.registerUser(inputUserDto),
    );
  }

  async login(inputUserDto: InputUserDto): Promise<AuthResponse> {
    const user: User = await this.userRepository.findUser(inputUserDto);
    if (user === null) {
      throw new BaseExceptionResponse(HttpStatus.NOT_FOUND, 'Mail not found');
    }
    if (
      !(await PasswordHandler.comparePassword(
        inputUserDto.password,
        user.password,
      ))
    ) {
      throw new BaseExceptionResponse(
        HttpStatus.UNAUTHORIZED,
        'Wrong password',
      );
    }
    return new AuthResponse(
      await this.jwtService.signAsync({
        sub: user.id.toString(),
        username: user.mail,
      }),
    );
  }
}
