import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
  ParseEnumPipe,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LibraryService } from './library.service';
import { Role } from 'src/common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { JwtPayload } from '../auth/types/jwt-payload.type';
import { CreateUserBookDto } from './dto/book-status.dto';
import { UserBookStatus } from './enum/library.enum';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  addUserBook(
    @Body() data: CreateUserBookDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const { status, ...bookData } = data; // Extraigo el status del DTO para pasarlo por separado
    return this.libraryService.addUserBook(bookData, user.sub, status);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:status')
  getUserBooksByStatus(
    @CurrentUser() id: JwtPayload,
    @Param('status', new ParseEnumPipe(UserBookStatus)) // Asegura que el status es un valor válido del enum
    status: UserBookStatus,
  ) {
    return this.libraryService.getUserBooksByStatus(id.sub, status);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  removeUserBook(@CurrentUser() id: JwtPayload, @Param('id') bookId: string) {
    return this.libraryService.removeUserBook(bookId, id.sub);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('/:id')
  updateUserBookStatus(
    @CurrentUser() id: JwtPayload,
    @Param('id') bookId: string,
    @Body('status', new ParseEnumPipe(UserBookStatus)) status: UserBookStatus,
  ) {
    return this.libraryService.updateUserBookStatus(bookId, id.sub, status);
  }
}
