import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import type { JwtPayload } from '@/auth/types/jwt-payload.type';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/common/enums/rol.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/review')
  addReviewOrUpdate(
    @Body() data: CreateReviewDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reviewService.addReviewOrUpdate(
      user.sub,
      data,
      data.rating,
      data.comment,
    );
  }
}
