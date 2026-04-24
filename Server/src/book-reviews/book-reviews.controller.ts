import { Controller, Param, Get } from '@nestjs/common';
import { BookReviewsService } from './book-reviews.service';

@Controller('books')
export class BookReviewsController {
  constructor(private readonly bookReviewsService: BookReviewsService) {}

  @Get(':id')
  getBookDetail(@Param('id') id: string) {
    return this.bookReviewsService.getBookDetailsWithReviews(id);
  }
}
