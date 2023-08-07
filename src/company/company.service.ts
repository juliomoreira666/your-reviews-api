// company/company.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyReviewsService } from '../services/company-reviews.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private companyReviewsService: CompanyReviewsService,
  ) {}

  async findAllCompanies(): Promise<Company[]> {
    const companies = await this.companyRepository.find({
      relations: ['reviews'],
    });

    for (const company of companies) {
      company.overallRating =
        await this.companyReviewsService.calculateOverallRating(
          company.company_id,
        );
      company.numberOfReviews = company.reviews.length;
    }

    return companies;
  }

  async findCompanyById(companyId: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { company_id: companyId },
      relations: ['reviews'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    company.overallRating =
      await this.companyReviewsService.calculateOverallRating(
        company.company_id,
      );
    company.numberOfReviews = company.reviews.length;
    return company;
  }

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    return this.companyRepository.save(company);
  }

  async updateCompany(
    companyId: string,
    companyData: Partial<Company>,
  ): Promise<Company> {
    await this.companyRepository.update(companyId, companyData);
    return this.companyRepository.findOne({ where: { company_id: companyId } });
  }

  async deleteCompany(companyId: string): Promise<void> {
    const result = await this.companyRepository.delete(companyId);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }
  }
}
