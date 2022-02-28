import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class registerDisconnectionDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
