import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TvShowSeason } from '../seasons/tv.show.season.entity';
import { Actor } from '../../actor/actor.entity';
import { Director } from '../../director/director.entity';

@Entity()
export class TvShowEpisode {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ minLength: 1, required: true, type: 'string' })
  title: string;

  @Column()
  @ApiProperty({
    minLength: 25,
    required: false,
    type: 'string',
    example: 'Una emocionante aventura en el espacio exterior',
  })
  description: string;

  @Column()
  @ApiProperty({ required: true, type: 'number' })
  episode_number: number;

  @Column()
  @ApiProperty({ required: false, type: 'number' })
  year: number;

  @Column()
  @ApiProperty({ example: 120, required: false, type: 'number' })
  duration: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  @ManyToOne(() => TvShowSeason, (season) => season.episodes)
  season: TvShowSeason;

  @ApiProperty({ type: () => Director })
  @ManyToOne(() => Director, (director) => director.tvShowsEpisodes)
  director: Director;

  @ApiProperty({ type: () => Actor, isArray: true })
  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];
}
