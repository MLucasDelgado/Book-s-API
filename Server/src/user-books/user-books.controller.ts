import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserBooksService } from './user-books.service';
import { Role } from 'src/common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { JwtPayload } from '../auth/types/jwt-payload.type';
import { CreateUserBookDto } from './dto/book-status.dto';
import { UserBookStatus } from './enum/userBook.enum';

@Controller('library')
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  addUserBook(
    @Body() data: CreateUserBookDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const { status, ...bookData } = data; // Extraigo el status del DTO para pasarlo por separado
    return this.userBooksService.addUserBook(bookData, user.sub, status);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:status')
  getUserBooksByStatus(
    @CurrentUser() id: JwtPayload,
    @Param('status', new ParseEnumPipe(UserBookStatus)) // Asegura que el status es un valor válido del enum
    status: UserBookStatus,
  ) {
    return this.userBooksService.getUserBooksByStatus(id.sub, status);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  removeUserBook(@CurrentUser() id: JwtPayload, @Param('id') bookId: string) {
    return this.userBooksService.removeUserBook(bookId, id.sub);
  }
}
