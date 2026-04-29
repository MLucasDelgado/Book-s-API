import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn  } from 'typeorm';
import { Library } from '@/library/entity/library.entity';
import { Review } from '@/reviews/entity/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column('text', { array: true, nullable: true })
  authors: string[];

  // Normalizamos los autores para facilitar la búsqueda y evitar duplicados (por ejemplo, "J.K. Rowling" y "J. K. Rowling" se considerarían el mismo autor)
  @Column()
  normalizedAuthors: string;

  @Column({ nullable: true }) // La miniatura puede no estar disponible para algunos libros
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  categories: string[];

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @Column({ default: false })
  createdByUser: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Library, (library) => library.book)
  userBooks: Library[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
