import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Book])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService], // Exportamos BooksService para que pueda ser utilizado en otros módulos
})
export class BooksModule {}
