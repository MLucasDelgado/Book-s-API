import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }
    await this.usersService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hashing de la contraseña utilizando bcrypt con un salt de 10 rondas.
    });

    return {
      name,
      email,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    // Access token (corto)
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    // Refresh token (largo)
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3d',
    });

    // guardo el refresh token hasheado en la base de datos para poder invalidarlo en caso de logout o si se sospecha que ha sido comprometido.
    await this.usersService.update(user.id, {
      refreshToken: await bcrypt.hash(refreshToken, 10),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {
    await this.usersService.update(userId, {
      refreshToken: null,
    });

    return { message: 'Logged out' };
  }

  async refresh(refreshToken: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.usersService.findOneById(payload.sub);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

      if (!isValid) {
        throw new UnauthorizedException();
      }

      // generar nuevo access token
      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          role: user.role,
        },
        {
          expiresIn: '15m',
        },
      );

      return {
        accessToken: newAccessToken,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async profile(userId: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
