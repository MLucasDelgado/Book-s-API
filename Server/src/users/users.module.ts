import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importa el módulo de TypeORM para la entidad User.
  providers: [UsersService],
  exports: [UsersService], // Exporta el servicio para que pueda ser utilizado en otros módulos, como AuthModule.
})
export class UsersModule {}
