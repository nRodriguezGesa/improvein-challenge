import { Injectable } from '@nestjs/common';
import { DirectorsRepository } from './directors.repository';
import {} from './directors.model';
import { Director } from './director.entity';
import { CreateActorDto } from '../actor/actors.model';

@Injectable()
export class DirectorsService {
  constructor(private readonly directorsRepository: DirectorsRepository) {}

  async createDirector(director: CreateActorDto): Promise<Director> {
    return await this.directorsRepository.createDirector(director);
  }

  async getDirectorById(id: number): Promise<Director> {
    return await this.directorsRepository.getDirectorById(id);
  }
}
