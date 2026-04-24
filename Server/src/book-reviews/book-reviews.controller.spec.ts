import { Test, TestingModule } from '@nestjs/testing';
import { BookReviewsController } from './book-reviews.controller';

describe('BookReviewsController', () => {
  let controller: BookReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookReviewsController],
    }).compile();

    controller = module.get<BookReviewsController>(BookReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
