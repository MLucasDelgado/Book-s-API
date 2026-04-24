import { Module } from '@nestjs/common';
import { BookReviewsService } from './book-reviews.service';
import { BookReviewsController } from './book-reviews.controller';
import { BooksModule } from '@/books/books.module';
import { ReviewsModule } from '@/reviews/reviews.module';

@Module({
  imports: [BooksModule, ReviewsModule],
  providers: [BookReviewsService],
  controllers: [BookReviewsController],
  exports: [BookReviewsService],
})
export class BookReviewsModule {}
