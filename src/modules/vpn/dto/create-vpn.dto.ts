import { IsString } from 'class-validator';

export class CreateVpnDto {
  @IsString()
  readonly vpnAddress: string;

  @IsString()
  readonly vpnName: string;

  @IsString()
  readonly vpnUsername: string;

  @IsString()
  readonly vpnPassword: string;
}
