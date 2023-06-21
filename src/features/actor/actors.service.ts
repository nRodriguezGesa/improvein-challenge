import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './actors.model';
import { ActorsRepository } from './actors.repository';
import { Actor } from './actor.entity';

@Injectable()
export class ActorsService {
  constructor(private readonly actorsRepository: ActorsRepository) {}

  async createActor(actor: CreateActorDto): Promise<Actor> {
    return await this.actorsRepository.createActor(actor);
  }

  async getActorByIds(ids: number[]): Promise<Actor[]> {
    return await this.actorsRepository.getActorByIds(ids);
  }
}
