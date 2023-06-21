import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'id',
    readOnly: true,
    minimum: 1,
  })
  id: string;
  @Column({ unique: true })
  @ApiProperty({ description: 'email address', example: 'test@test.com' })
  @IsEmail()
  mail: string;
  @Column()
  @IsStrongPassword()
  @ApiProperty({
    description: 'unHashed password',
    example: 'abcd1234$$ADC',
    minLength: 8,
  })
  password: string;
}
