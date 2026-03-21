import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get('all')
  getBooks() {
    return this.booksService.getBooks();
  }
}
