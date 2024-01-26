import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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
  @Length(3, 255)
  @Expose({ name: 'phone' })
  @ApiProperty({ name: 'phone', description: 'User Phone' })
  phone: string;

  @IsString()
  @Length(3, 32)
  @Expose({ name: 'password' })
  @ApiProperty({ name: 'password', description: 'User Password' })
  password: string;

  @IsString()
  @Length(3, 100)
  @Expose({ name: 'coach_name' })
  @ApiProperty({ name: 'coach_name', description: 'Coach Name' })
  @IsOptional()
  coachName?: string;

  @IsString()
  @Length(3, 255)
  @Expose({ name: 'coach_phone' })
  @ApiProperty({ name: 'coach_phone', description: 'Coach Phone' })
  @IsOptional()
  coachPhone?: string;

  @IsString()
  @Length(3, 100)
  @Expose({ name: 'platinum_name' })
  @ApiProperty({ name: 'platinum_name', description: 'Platinum Name' })
  @IsOptional()
  platinumName?: string;
}
