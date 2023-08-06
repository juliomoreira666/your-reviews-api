// shared/shared.module.ts

import { Module } from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompanyReview } from 'src/company-reviews/company-reviews.entity';
import { Company } from 'src/company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyReview])],
  providers: [CompanyReviewsService],
  exports: [CompanyReviewsService],
})
export class SharedModule {}
