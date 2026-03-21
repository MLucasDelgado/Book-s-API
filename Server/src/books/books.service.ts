import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleBook } from './type/type-books';
import { GoogleBooksResponse } from './type/type-books';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookFromApiDto } from '../common/dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  private readonly apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  async getBooks() {
    const categories = [
      'romance',
      'fiction',
      'action',
      'science fiction',
      'fantasy',
      'horror',
      'self improvement',
      'mystery',
      'thriller',
      'adventure',
      'biography',
      'history',
      'philosophy',
      'psychology',
      'business',
    ];

    const promises = categories.map((category) =>
      axios.get<GoogleBooksResponse>(
        'https://www.googleapis.com/books/v1/volumes',
        {
          params: {
            q: category,
            maxResults: 10,
            key: this.apiKey,
          },
        },
      ),
    );

    const results = await Promise.all(promises); // Espera a que todas las solicitudes se completen y devuelve un array de respuestas

    const booksByCategory = {}; // { fiction: [...], romance: [...] }

    categories.forEach((category, index) => {
      booksByCategory[category] = results[index].data.items.map(
        (book: GoogleBook) => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          thumbnail:
            book.volumeInfo.imageLinks?.thumbnail
              ?.replace('http://', 'https://')
              ?.replace('zoom=1', 'zoom=2') || null,
        }),
      );
    });

    return booksByCategory;
  }

  async ensureBookExists(bookData: CreateBookFromApiDto) {
    const existingBook = await this.bookRepository.findOne({
      where: { id: bookData.id },
    });
    console.log('Existing book:', existingBook);

    if (existingBook) return existingBook;

    const newBook = this.bookRepository.create({
      id: bookData.id,
      title: bookData.title,
      authors: bookData.authors,
      thumbnail: bookData.thumbnail,
      createdByUser: false, // Indica que este libro proviene de la API de Google Books
    });
    await this.bookRepository.save(newBook);

    return newBook;
  }
}
