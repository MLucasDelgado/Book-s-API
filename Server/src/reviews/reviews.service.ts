import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entity/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async addOrUpdateReviewRaw(
    userId: string,
    bookId: string,
    rating: number,
    comment?: string,
  ) {
    const existing = await this.reviewRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      return this.reviewRepository.save(existing);
    }

    const review = this.reviewRepository.create({
      user: { id: userId },
      book: { id: bookId },
      rating,
      comment,
    });

    return this.reviewRepository.save(review);
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
