import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsArray()
  @IsOptional()
  authors?: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  categories?: string[];
}
