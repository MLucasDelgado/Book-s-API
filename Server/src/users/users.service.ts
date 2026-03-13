import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repsitory es una capa que permite interactuar con la base de datos sin escribir SQL
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto); // Guarda un nuevo usuario en la base de datos utilizando el DTO (Data Transfer Object) que contiene los datos del usuario a crear.
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
