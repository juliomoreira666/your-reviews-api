import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyReview } from 'src/company-reviews/company-reviews.entity';
import { CompanyReviewsService } from 'src/services/company-reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyReview])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyReviewsService],
})
export class CompanyModule {}
