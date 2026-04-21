import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entity/library.entity';
import { BooksModule } from '@/books/books.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [BooksModule, AuthModule, TypeOrmModule.forFeature([Library])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
