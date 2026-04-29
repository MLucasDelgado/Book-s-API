import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, MoreThan } from 'typeorm';
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

  async searchBook(query: string) {
    if (!query || query.trim() === '') return [];

    const books = await this.bookRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { normalizedAuthors: ILike(`%${query}%`) },
      ],
    });

    if (books.length === 0) {
      throw new NotFoundException('No books found');
    }

    return books;
  }

  async getPopularBooks(limit: number = 10) {
    return this.bookRepository.find({
      where: {
        views: MoreThan(0), // para que no me traiga basura
      },
      order: {
        views: 'DESC',
      },
      take: limit, // limita la cantidad (tipo carrusel)
    });
  }

  async getRatedBooks(limit: number = 10) {
    return this.bookRepository.find({
      where: {
        rating: MoreThan(0),
        reviewsCount: MoreThan(5),
      },
      order: {
        rating: 'DESC',
        reviewsCount: 'DESC',
      },
      take: limit,
    });
  }

  async getNewBooks(limit: number = 10) {
    return this.bookRepository.find({
      order: {
        createdAt: 'DESC'
      },
      take: limit,
    })
  }
}
