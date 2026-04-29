import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '@/books/dto/book.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { Role } from '@/common/enums/rol.enum';
import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get('/search')
  getSearchedBook(@Query('query') query: string) {
    return this.booksService.searchBook(query);
  }

  @Get('/popular')
  getPopularBooks() {
    return this.booksService.getPopularBooks();
  }

  @Get('/top-rated')
  getRatedBooks() {
    return this.booksService.getRatedBooks();
  }

  @Get('/new')
  getNewBooks() {
    return this.booksService.getNewBooks();
  }
}
