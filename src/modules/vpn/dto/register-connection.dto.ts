import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class registerConnectionDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly userInfo: string;
}
