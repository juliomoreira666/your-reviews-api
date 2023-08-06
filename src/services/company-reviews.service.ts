// company-reviews.service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyReview } from '../company-reviews/company-reviews.entity';

@Injectable()
export class CompanyReviewsService {
  constructor(
    @InjectRepository(CompanyReview)
    private companyReviewRepository: Repository<CompanyReview>,
  ) {}

  async calculateOverallRating(companyId: string): Promise<number> {
    const reviews = await this.companyReviewRepository.find({
      where: { company: { company_id: companyId } },
    });

    if (reviews.length === 0) {
      return 0; // Sem avaliações, avaliação geral é 0.
    }

    const totalRatings = reviews.reduce(
      (sum, review) =>
        sum +
        review.culture_rating +
        review.leadership_rating +
        review.compensation_rating +
        review.work_life_balance_rating +
        review.career_development_rating +
        review.work_environment_rating +
        review.interpersonal_relations_rating +
        review.project_management_rating +
        review.innovation_rating +
        review.social_responsibility_rating,
      0,
    );

    const overallRating = totalRatings / (reviews.length * 10); // Assume que cada critério é avaliado de 0 a 5.

    return overallRating;
  }
}
