import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksService } from '@/books/books.service';
import { ReviewsService } from '@/reviews/reviews.service';
import { CreateBookDto } from '@/books/dto/book.dto';

@Injectable()
export class BookReviewsService {
  constructor(
    private readonly booksService: BooksService,
    private readonly reviewsService: ReviewsService,
  ) {}

  async getBookDetailsWithReviews(bookId: string) {
    const book = await this.booksService.getBookById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const reviews = await this.reviewsService.getReviewsByBook(bookId);

    return {
      ...book,
      reviews,
    };
  }

  async addReviewOrUpdate(
    userId: string,
    bookData: CreateBookDto,
    rating: number,
    comment?: string,
  ) {
    const book = await this.booksService.ensureBookExists(bookData);

    await this.reviewsService.addOrUpdateReviewRaw(
      userId,
      book.id,
      rating,
      comment,
    );

    await this.updateBookRating(book.id);
  }

  async updateBookRating(bookId: string) {
    const reviews = await this.reviewsService.getReviewsByBook(bookId);

    const avg =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    await this.booksService.updateBookRating(bookId, avg, reviews.length);
  }
}
