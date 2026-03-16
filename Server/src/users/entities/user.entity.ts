import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Decorador que indica que esta propiedad es una columna en la base de datos.
  name: string;

  @Column({ unique: true, nullable: false }) // El correo electrónico debe ser único en la base de datos.
  email: string;

  @Column({ nullable: false, select: false }) // La contraseña no se selecciona por defecto en las consultas para mayor seguridad.
  password: string;

  @Column({ default: 'user' })
  role: string;

  @DeleteDateColumn() // Se elimina el usuario pero se mantiene en la base de datos para posibles auditorías o restauraciones futuras.
  deletedAt: Date;
}
