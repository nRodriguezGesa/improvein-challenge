import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TvShow } from '../tv.shows/tv.show.entity';
import { TvShowEpisode } from '../episodes/tv.show.episode.entity';

@Entity()
export class TvShowSeason {
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
  @ApiProperty({ required: false, type: 'number' })
  year: number;

  @Column()
  @ApiProperty({ required: true, type: 'number' })
  seasonNumber: number;

  @Column()
  @ApiProperty({ required: true, type: 'number' })
  episodesQ: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  @ManyToOne(() => TvShow, (show) => show.seasons)
  @ApiProperty({ type: () => TvShow })
  tvShow?: TvShow;

  @OneToMany(() => TvShowEpisode, (episode) => episode.season, {
    cascade: true,
  })
  @ApiProperty({ type: () => TvShowEpisode, isArray: true })
  episodes?: TvShowEpisode[];
}
