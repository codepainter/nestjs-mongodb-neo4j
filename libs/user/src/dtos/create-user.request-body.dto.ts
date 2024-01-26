import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestBodyDto {
  @IsString()
  @Length(3, 100)
  @Expose({ name: 'first_name' })
  @ApiProperty({ name: 'first_name', description: 'User first name' })
  firstName: string;

  @IsString()
  @Length(3, 100)
  @Expose({ name: 'last_name' })
  @ApiProperty({ name: 'last_name', description: 'User last name' })
  lastName: string;

  @IsString()
  @Length(3, 255)
  @Expose({ name: 'bio' })
  @ApiProperty({ name: 'bio', description: 'User bio' })
  bio: string;
}
