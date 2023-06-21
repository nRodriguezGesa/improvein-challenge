import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
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
}
