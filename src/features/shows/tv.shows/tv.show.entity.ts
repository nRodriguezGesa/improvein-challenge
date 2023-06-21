import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TvShowSeason } from '../seasons/tv.show.season.entity';
import { genre } from '../../../enums/genres.enum';

@Entity()
export class TvShow {
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
  seasonsQ: number;

  @Column('simple-array')
  @ApiProperty({ required: true, type: 'string', enum: genre })
  genre: string;

  @Column()
  @ApiProperty({ required: false, type: 'number' })
  beginYear: number;

  @Column()
  @ApiProperty({ required: false, type: 'number' })
  endYear: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  @OneToMany(() => TvShowSeason, (season) => season.tvShow, { cascade: true })
  @ApiProperty({ type: () => TvShowSeason, isArray: true })
  seasons: TvShowSeason[];
}
