import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entity/favorite.entity';
import { BooksService } from 'src/books/books.service';
import { CreateBookFromApiDto } from '../common/dto/book.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly booksService: BooksService,
  ) {}

  async addFavorite(bookData: CreateBookFromApiDto, userId: string) {
    console.log('BOOK DATA:', bookData);
    const book = await this.booksService.ensureBookExists(bookData);
    const existing = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: book.id },
      },
    });
    if (existing) return existing;

    const favorite = this.favoriteRepository.create({
      user: { id: userId },
      book: { id: book.id },
    });
    return this.favoriteRepository.save(favorite);
  }
}
