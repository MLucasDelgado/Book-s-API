import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
@Unique(['user', 'book']) // Asegura que un usuario no pueda tener el mismo libro con el mismo estado más de una vez
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  // Esta relacion se conecta con la propiedad userBook de la entidad User
  @ManyToOne(() => User, (user) => user.userBooks, {
    onDelete: 'CASCADE',
  })
  user: User;

  // Esta relacion se conecta con la propiedad userBook de la entidad Book
  @ManyToOne(() => Book, (book) => book.userBooks, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @Column({
    type: 'enum',
    enum: ['FAVORITE', 'WANT_TO_READ', 'READING', 'READ'], // Enum para representar el estado del libro para el usuario
  })
  status: string;
}
