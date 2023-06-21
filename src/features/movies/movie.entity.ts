import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Director } from '../director/director.entity';
import { Actor } from '../actor/actor.entity';
import { genre } from '../../enums/genres.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ minLength: 1, required: true, type: 'string' })
  title: string;

  @Column({ default: '' })
  @ApiProperty({
    minLength: 25,
    required: false,
    default: '',
    type: 'string',
    example: 'Una emocionante aventura en el espacio exterior',
  })
  description: string;

  @Column({ default: 0 })
  @ApiProperty({ required: false, type: 'number', default: 0 })
  year: number;

  @Column({ default: 0 })
  @ApiProperty({ example: 120, required: false, type: 'number', default: '' })
  duration: number;

  @Column()
  @ApiProperty({ required: true, type: 'string', enum: genre })
  genre: string;

  @Column({ type: 'float' })
  @ApiProperty({ example: 8.5, required: true, type: 'number' })
  rating: number;

  @ApiProperty({ type: () => Director })
  @ManyToOne(() => Director, (director) => director.movies)
  director: Director;

  @ApiProperty({ type: () => Actor, isArray: true })
  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];
}
