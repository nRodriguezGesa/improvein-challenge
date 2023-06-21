import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './director.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateDirectorDto } from './directors.model';
import BaseExceptionResponse from '../../models/base.exception.response.model';

@Injectable()
export class DirectorsRepository {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async createDirector(director: CreateDirectorDto): Promise<Director> {
    if (await this.directorRepository.findOneBy({ name: director.name })) {
      throw new BaseExceptionResponse(HttpStatus.CONFLICT, 'Duplicate name');
    }
    try {
      return await this.directorRepository.save(director);
    } catch (error) {
      const errorMessage = `Error creating director: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }

  async getDirectorById(id: number): Promise<Director> {
    try {
      return await this.directorRepository.findOneByOrFail({ id: id });
    } catch (error) {
      let errorMessage: string;
      let status: number;
      if (error instanceof EntityNotFoundError) {
        errorMessage = `Director not found: ${error}`;
        status = HttpStatus.NOT_FOUND;
        throw new BaseExceptionResponse(HttpStatus.NOT_FOUND, errorMessage);
      } else {
        errorMessage = `Error finding director: ${error}`;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(status, errorMessage);
    }
  }
}
