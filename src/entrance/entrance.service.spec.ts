import { Test, TestingModule } from '@nestjs/testing';
import { EntranceService } from './entrance.service';

describe('EntranceService', () => {
  let service: EntranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntranceService],
    }).compile();

    service = module.get<EntranceService>(EntranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
