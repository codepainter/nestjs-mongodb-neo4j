import { Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestBodyDto {
  @IsString()
  @Length(3, 100)
  @Expose({ name: 'name' })
  name: string;

  @IsEmail()
  @IsString()
  @Length(3, 100)
  @Expose({ name: 'email' })
  @ApiProperty({ name: 'email', description: 'User Email' })
  email: string;

  @IsString()
  @Length(3, 32)
  @Expose({ name: 'password' })
  @ApiProperty({ name: 'password', description: 'User Password' })
  password: string;
}
