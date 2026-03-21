import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

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

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role', 'refreshToken'],
    });
  }

  findOneById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.userRepository.merge(user, data);

    return this.userRepository.save(updatedUser);
  }
}
