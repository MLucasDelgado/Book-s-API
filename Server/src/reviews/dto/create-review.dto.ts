import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { CreateBookFromApiDto } from '../../common/dto/book.dto';

export class CreateReviewDto extends CreateBookFromApiDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
