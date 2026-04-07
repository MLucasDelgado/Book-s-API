import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './entity/library.entity';
import { BooksService } from '../books/books.service';
import { CreateBookFromApiDto } from '../common/dto/book.dto';
import { UserBookStatus } from './enum/library.enum';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    private readonly booksService: BooksService,
  ) {}

  async addUserBook(
    bookData: CreateBookFromApiDto,
    userId: string,
    status: UserBookStatus,
  ) {
    const book = await this.booksService.ensureBookExists(bookData);
    const existing = await this.libraryRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: book.id },
      },
    });

    if (existing) {
      throw new NotFoundException(
        `The book is already on the '${existing.status}' list`,
      );
    }

    const userBook = this.libraryRepository.create({
      user: { id: userId },
      book: { id: book.id },
      status,
    });

    return this.libraryRepository.save(userBook);
  }

  async getUserBooksByStatus(userId: string, status: UserBookStatus) {
    const userBooks = await this.libraryRepository.find({
      where: { user: { id: userId }, status }, // Estoy filtrando por una relación y el estado
      relations: ['book'],
    });

    const books = userBooks.map((ub) => ub.book);
    return books;
  }

  async removeUserBook(bookId: string, userId: string) {
    const result = await this.libraryRepository.delete({
      user: { id: userId },
      book: { id: bookId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('User book not found');
    }

    return { message: 'Deleted successfully' };
  }

  async updateUserBookStatus(
    bookId: string,
    userId: string,
    status: UserBookStatus,
  ) {
    const userBook = await this.libraryRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!userBook) {
      throw new NotFoundException('User book not found');
    }

    userBook.status = status;
    return this.libraryRepository.save(userBook);
  }
}
