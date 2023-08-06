import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyReview } from './company-reviews.entity';

@Injectable()
export class CompanyReviewsService {
  constructor(
    @InjectRepository(CompanyReview)
    private companyReviewRepository: Repository<CompanyReview>,
  ) {}

  async create(reviewData: Partial<CompanyReview>): Promise<CompanyReview> {
    const review = this.companyReviewRepository.create(reviewData);
    return this.companyReviewRepository.save(review);
  }

  async findReviewsByCompanyId(companyId: string): Promise<CompanyReview[]> {
    return this.companyReviewRepository.find({
      where: { company: { company_id: companyId } },
    });
  }
  async findAll(): Promise<CompanyReview[]> {
    return this.companyReviewRepository.find();
  }

  async delete(reviewId: string): Promise<void> {
    const result = await this.companyReviewRepository.delete(reviewId);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }
  }
}
