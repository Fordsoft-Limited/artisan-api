import { Test, TestingModule } from '@nestjs/testing';
import { EntranceController } from './entrance.controller';

describe('EntranceController', () => {
  let controller: EntranceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntranceController],
    }).compile();

    controller = module.get<EntranceController>(EntranceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
