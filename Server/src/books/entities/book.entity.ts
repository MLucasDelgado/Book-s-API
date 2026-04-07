import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Library } from '../../library/entity/library.entity';
import { Review } from '../../reviews/entity/review.entity';

@Entity()
export class Book {
  @PrimaryColumn() // El ID del libro se obtiene directamente de la API de Google Books, por lo que no se genera automáticamente.
  id: string;

  @Column()
  title: string;

  @Column('text', { array: true, nullable: true }) // Autores como array porque puede haber varios autores
  authors: string[];

  @Column({ nullable: true }) // La miniatura puede no estar disponible para algunos libros
  thumbnail: string;

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @Column({ default: false })
  createdByUser: boolean; // Indica si el libro fue creado por un usuario o proviene de la API de Google Books, si es false viene de la API

  @OneToMany(() => Library, (library) => library.book)
  userBooks: Library[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
