import { Test, TestingModule } from '@nestjs/testing';
import { VpnController } from '../vpn.controller';
import { VpnService } from '../vpn.service';
import { Vpn } from '../interfaces/vpn.interface';

describe('VpnController', () => {
  let controller: VpnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VpnService],
      controllers: [VpnController],
    }).compile();

    controller = module.get<VpnController>(VpnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get return "test"', () => {
    const vpn: Vpn[] = [];
    expect(controller.getAll()).toBe(vpn);
  });
});
