import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
@Unique(['user', 'book']) // Asegura que un usuario no pueda marcar el mismo libro como favorito más de una vez
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: 'CASCADE', // Si un usuario es eliminado, también se eliminarán sus favoritos
  })
  user: User;

  @ManyToOne(() => Book, (book) => book.id, {
    onDelete: 'CASCADE',
  })
  book: Book;
}
