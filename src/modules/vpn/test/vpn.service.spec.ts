import { Test, TestingModule } from '@nestjs/testing';
import { VpnService } from '../vpn.service';

describe('VpnService', () => {
  let service: VpnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VpnService],
    }).compile();

    service = module.get<VpnService>(VpnService);
  });

  it('should be defined', () => {
    expect(service.getOne()).toBe(undefined);
  });
});
