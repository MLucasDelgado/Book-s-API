import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { CreateBookDto } from '@/books/dto/book.dto';

export class CreateReviewDto extends CreateBookDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
