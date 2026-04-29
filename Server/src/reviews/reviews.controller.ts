import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import type { JwtPayload } from '@/auth/types/jwt-payload.type';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/common/enums/rol.enum';
import { ReviewsService } from './reviews.service';

@Controller('books')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':bookId/reviews')
  addReview(
    @Param('bookId') bookId: string,
    @Body() data: CreateReviewDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reviewsService.addOrUpdateReviewRaw(
      user.sub,
      bookId,
      data.rating,
      data.comment,
    );
  }
}
