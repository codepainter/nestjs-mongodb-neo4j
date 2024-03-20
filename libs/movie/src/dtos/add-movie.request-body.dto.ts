import { IsNotEmpty, IsString } from 'class-validator';

export class AddMovieRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
