import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TvShowEpisode } from '../shows/episodes/tv.show.episode.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({
    type: 'string',
    required: false,
    example: new Date().toLocaleDateString(),
  })
  birthDate: string;

  @Column({ unique: true })
  @ApiProperty({ type: 'string', minLength: 1, required: true })
  name: string;

  @Column()
  @ApiProperty({ type: 'string', minLength: 1, required: false })
  nationality: string;

  @ApiProperty({ type: () => Movie, isArray: true })
  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];

  @ApiProperty({ type: () => TvShowEpisode, isArray: true })
  @OneToMany(() => TvShowEpisode, (episode) => episode.director)
  tvShowsEpisodes: TvShowEpisode[];
}
