import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompanyReview } from './company-reviews.entity';

@Controller('company-reviews')
export class CompanyReviewsController {
  constructor(private readonly companyReviewsService: CompanyReviewsService) {}

  @Post()
  async create(
    @Body() reviewData: Partial<CompanyReview>,
  ): Promise<CompanyReview> {
    return this.companyReviewsService.create(reviewData);
  }

  @Get()
  async findAll(): Promise<CompanyReview[]> {
    return this.companyReviewsService.findAll();
  }

  @Get(':companyId')
  async findReviewsByCompanyId(@Param('companyId') companyId: string) {
    return this.companyReviewsService.findReviewsByCompanyId(companyId);
  }

  @Delete(':id')
  async delete(@Param('id') reviewId: string): Promise<void> {
    return this.companyReviewsService.delete(reviewId);
  }
}
