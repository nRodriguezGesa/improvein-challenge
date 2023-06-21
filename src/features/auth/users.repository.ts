import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputUserDto } from './users.model';
import BaseExceptionResponse from 'src/models/base.exception.response.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async registerUser(inputUserDto: InputUserDto): Promise<User> {
    try {
      return await this.usersRepository.save(inputUserDto);
    } catch (error) {
      const errorMessage = `Error creating user: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }

  async findUser(inputUserDto: InputUserDto): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({
        mail: inputUserDto.mail,
      });
    } catch (error) {
      const errorMessage = `Error finding user: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }
}
