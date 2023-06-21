import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Actor } from './actor.entity';

export class BaseActor {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: 'string',
    required: false,
    example: new Date().toLocaleDateString(),
  })
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', minLength: 1, required: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', minLength: 1, required: false })
  nationality?: string;
}
export class CreateActorDto extends OmitType(BaseActor, ['id'] as const) {}

export class CreateActorResponse extends BaseActor {
  constructor(actor: Actor) {
    super();
    Object.assign(this, actor);
  }
}
