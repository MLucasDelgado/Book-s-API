import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Book } from '@/books/entities/book.entity';
import { User } from '@/users/entities/user.entity';
import { Review } from '@/reviews/entity/review.entity';
import { Library } from '@/library/entity/library.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Book, User, Review, Library], // 🔥 TODAS
  synchronize: true,
});