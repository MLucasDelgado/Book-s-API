import { IsEnum } from 'class-validator';
import { UserBookStatus } from '../enum/userBook.enum';
import { CreateBookFromApiDto } from '../../common/dto/book.dto';

export class CreateUserBookDto extends CreateBookFromApiDto {
  @IsEnum(UserBookStatus)
  status: UserBookStatus;
}
