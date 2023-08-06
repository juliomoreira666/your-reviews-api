import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAllCompanies(): Promise<any[]> {
    return this.companyService.findAllCompanies();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<Company> {
    return this.companyService.findCompanyById(id);
  }

  @Post()
  async createCompany(@Body() companyData: Partial<Company>): Promise<Company> {
    return this.companyService.createCompany(companyData);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() companyData: Partial<Company>,
  ): Promise<Company> {
    return this.companyService.updateCompany(id, companyData);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string): Promise<void> {
    return this.companyService.deleteCompany(id);
  }
}
