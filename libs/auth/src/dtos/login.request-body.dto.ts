import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBodyDto {
  @IsEmail()
  @IsString()
  @Expose({ name: 'email' })
  @IsOptional()
  @ApiProperty({ name: 'email', description: 'User Email', required: false })
  email?: string;

  @IsString()
  @Expose({ name: 'phone' })
  @IsOptional()
  @ApiProperty({ name: 'phone', description: 'User Phone', required: false })
  phone?: string;

  @IsString()
  @Expose({ name: 'password' })
  @ApiProperty({ name: 'password', description: 'User Password' })
  password: string;
}
