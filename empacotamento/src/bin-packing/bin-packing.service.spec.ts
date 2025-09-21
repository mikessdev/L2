import { Test, TestingModule } from '@nestjs/testing';
import { BinPackingService } from './bin-packing.service';

describe('BinPackingService', () => {
  let service: BinPackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinPackingService],
    }).compile();

    service = module.get<BinPackingService>(BinPackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
