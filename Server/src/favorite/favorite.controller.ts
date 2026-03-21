import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FavoriteService } from './favorite.service';
import { CreateBookFromApiDto } from '../common/dto/book.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { JwtPayload } from '../auth/types/jwt-payload.type';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoriteService) {}
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  addFavorite(
    @Body() bookData: CreateBookFromApiDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.favoritesService.addFavorite(bookData, user.sub);
  }
}
