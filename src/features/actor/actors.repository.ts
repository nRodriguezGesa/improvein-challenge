import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Actor } from './actor.entity';
import { CreateActorDto } from './actors.model';
import BaseExceptionResponse from '../../models/base.exception.response.model';

@Injectable()
export class ActorsRepository {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
  ) {}

  async createActor(actor: CreateActorDto): Promise<Actor> {
    if (await this.actorsRepository.findOneBy({ name: actor.name })) {
      throw new BaseExceptionResponse(HttpStatus.CONFLICT, 'Duplicate name');
    }
    try {
      return await this.actorsRepository.save(actor);
    } catch (error) {
      const errorMessage = 'Error creating actor: ${error}';
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error creating actor',
      );
    }
  }

  async getActorByIds(ids: number[]): Promise<Actor[]> {
    try {
      return await this.actorsRepository.find({ where: { id: In(ids) } });
    } catch (error) {
      const errorMessage = `Error getting actors: ${error}`;
      Logger.error(errorMessage);
      throw new BaseExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage,
      );
    }
  }
}
