import { IsEnum } from 'class-validator';
import { UserBookStatus } from '../enum/library.enum';
import { CreateBookFromApiDto } from '../../common/dto/book.dto';

export class CreateUserBookDto extends CreateBookFromApiDto {
  @IsEnum(UserBookStatus)
  status: UserBookStatus;
}
