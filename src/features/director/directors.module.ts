import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './director.entity';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { DirectorsRepository } from './directors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectorsController],
  providers: [DirectorsService, DirectorsRepository],
  exports: [DirectorsService, DirectorsRepository],
})
export class DirectorsModule {}
