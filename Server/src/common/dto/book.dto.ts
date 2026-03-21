import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookFromApiDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsArray()
  @IsOptional()
  authors?: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
