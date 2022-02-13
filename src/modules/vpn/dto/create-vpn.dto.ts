import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVpnDto {
  @IsNotEmpty()
  @IsString()
  readonly vpnAddress: string;

  @IsNotEmpty()
  @IsString()
  readonly vpnName: string;

  @IsNotEmpty()
  @IsString()
  readonly vpnUsername: string;

  @IsNotEmpty()
  @IsString()
  readonly vpnPassword: string;
}
