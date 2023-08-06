import { Module } from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompanyReviewsController } from './company-reviews.controller';
import { CompanyReview } from './company-reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyReview])],
  controllers: [CompanyReviewsController],
  providers: [CompanyReviewsService],
})
export class CompanyReviewsModule {}
