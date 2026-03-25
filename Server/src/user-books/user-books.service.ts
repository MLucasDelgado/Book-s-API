import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBook } from './entity/user-books.entity';
import { BooksService } from 'src/books/books.service';
import { CreateBookFromApiDto } from '../common/dto/book.dto';
import { UserBookStatus } from './enum/userBook.enum';

@Injectable()
export class UserBooksService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,
    private readonly booksService: BooksService,
  ) {}

  async addUserBook(
    bookData: CreateBookFromApiDto,
    userId: string,
    status: UserBookStatus,
  ) {
    const book = await this.booksService.ensureBookExists(bookData);
    const existing = await this.userBookRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: book.id },
      },
    });
    if (existing) {
      existing.status = status;
      return this.userBookRepository.save(existing);
    }

    const userBook = this.userBookRepository.create({
      user: { id: userId },
      book: { id: book.id },
      status,
    });
    return this.userBookRepository.save(userBook);
  }

  async getUserBooksByStatus(userId: string, status: UserBookStatus) {
    const userBooks = await this.userBookRepository.find({
      where: { user: { id: userId }, status }, // Estoy filtrando por una relación y el estado
      relations: ['book'],
    });

    const books = userBooks.map((ub) => ub.book);
    return books;
  }

  async removeUserBook(bookId: string, userId: string) {
    const result = await this.userBookRepository.delete({
      user: { id: userId },
      book: { id: bookId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('User book not found');
    }

    return { message: 'Deleted successfully' };
  }
}
