import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entity/review.entity';
import { BooksService } from '@/books/books.service';
import { CreateBookDto } from '@/books/dto/book.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly booksService: BooksService,
  ) {}

  async addReviewOrUpdate(
    userId: string,
    bookData: CreateBookDto,
    rating: number,
    comment?: string,
  ) {
    const book = await this.booksService.ensureBookExists(bookData);

    const existing = await this.reviewRepository.findOne({
      where: { user: { id: userId }, book: { id: book.id } },
    });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;

      await this.reviewRepository.save(existing);
    } else {
      const review = this.reviewRepository.create({
        user: { id: userId },
        book: { id: book.id },
        rating,
        comment,
      });

      await this.reviewRepository.save(review);
    }

    await this.updateBookRating(book.id);
  }

  async updateBookRating(bookId: string) {
    const reviews = await this.reviewRepository.find({
      where: { book: { id: bookId } },
    });

    const avg =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    await this.booksService.updateBookRating(bookId, avg, reviews.length);
  }

  async getReviewsByBook(bookId: string) {
    return this.reviewRepository.find({
      where: { book: { id: bookId } },
      relations: ['user'],
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
