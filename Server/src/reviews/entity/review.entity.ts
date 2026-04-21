import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Book } from '@/books/entities/book.entity';

@Entity()
@Unique(['user', 'book'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number; // El signo de exclamación indica que esta propiedad se inicializará en algún momento, pero no en el constructor

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Book, (book) => book.reviews, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ type: 'int' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
