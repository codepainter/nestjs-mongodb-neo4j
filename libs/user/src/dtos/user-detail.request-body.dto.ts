import { IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsRequestBodyDto {
  @IsUUID()
  @IsString()
  @ApiProperty({ name: 'id', description: 'User ID' })
  id: string;
}
