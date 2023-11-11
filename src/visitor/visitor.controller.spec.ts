import { Test, TestingModule } from '@nestjs/testing';
import { VisitorController } from './visitor.controller';

describe('VisitorController', () => {
  let controller: VisitorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorController],
    }).compile();

    controller = module.get<VisitorController>(VisitorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
