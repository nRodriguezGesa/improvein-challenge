import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor.entity';
import { ActorsController } from './actors.controller';
import { ActorsRepository } from './actors.repository';
import { ActorsService } from './actors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService, ActorsRepository],
  exports: [ActorsService, ActorsRepository],
})
export class ActorsModule {}
