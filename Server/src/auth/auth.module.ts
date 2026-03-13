import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // Importa el módulo de usuarios para poder usar el servicio de usuarios en el servicio de autenticación.
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
