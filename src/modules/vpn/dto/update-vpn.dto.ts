import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateVpnDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isAvailable: boolean;

  @IsNotEmpty()
  @IsString()
  readonly userInfo: string;
}
