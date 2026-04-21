import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from '@/books/dto/book.dto';
import { normalizeAuthors } from './utils/normalizeAuthors';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Si el usuario intenta crear un libro que ya existe, simplemente devuelve el libro existente en lugar de crear uno nuevo
  async create(createBookDto: CreateBookDto) {
    const normalizedAuthors = normalizeAuthors(createBookDto.authors);

    const exists = await this.bookRepository.findOne({
      where: {
        title: createBookDto.title,
        normalizedAuthors: normalizedAuthors,
      },
    });

    if (exists) return exists;

    const book = this.bookRepository.create({
      ...createBookDto,
      normalizedAuthors,
    });

    return this.bookRepository.save(book);
  }

  async getBooks() {
    return this.bookRepository.find();
  }

  async ensureBookExists(bookData: CreateBookDto) {
    const normalizedAuthors = normalizeAuthors(bookData.authors);

    const existingBook = await this.bookRepository.findOne({
      where: { title: bookData.title, normalizedAuthors: normalizedAuthors },
    });

    if (existingBook) return existingBook;

    const newBook = this.bookRepository.create({
      ...bookData,
      normalizedAuthors,
    });

    await this.bookRepository.save(newBook);

    return newBook;
  }

  async updateBookRating(
    bookId: string,
    averageRating: number,
    reviewsCount: number,
  ) {
    await this.bookRepository.update(bookId, {
      rating: averageRating,
      reviewsCount: reviewsCount,
    });
  }

  async getBookById(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.views += 1;
    await this.bookRepository.save(book);

    return book;
  }
}
