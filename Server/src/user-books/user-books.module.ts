import { Module } from '@nestjs/common';
import { UserBooksController } from './user-books.controller';
import { UserBooksService } from './user-books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './entity/user-books.entity';
import { BooksModule } from '../books/books.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [BooksModule, AuthModule, TypeOrmModule.forFeature([UserBook])],
  controllers: [UserBooksController],
  providers: [UserBooksService],
})
export class UserBooksModule {}
