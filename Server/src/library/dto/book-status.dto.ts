import { IsEnum } from 'class-validator';
import { UserBookStatus } from '../enum/library.enum';
import { CreateBookDto } from '@/books/dto/book.dto';

export class CreateUserBookDto extends CreateBookDto {
  @IsEnum(UserBookStatus)
  status: UserBookStatus;
}
