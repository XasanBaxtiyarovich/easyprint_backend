import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Company } from './entities';

@ApiTags('Company')
@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: "Company create" })
  @ApiResponse({ status: 200, type: Company })
  @Post('create')
  create(
      @Body() createCompanyDto: CreateCompanyDto
  ): Promise<Object> {
      return this.companiesService.create(createCompanyDto)
  }

  @ApiOperation({ summary: "Find all companies" })
  @ApiResponse({ status: 200, type: [ Company ] })
  @Get('findAll')
  findAll(): Promise<Object> {
      return this.companiesService.findAll()
  }

  @ApiOperation({ summary: "Find one company" })
  @ApiResponse({ status: 200, type: Company})
  @Get('find/:id')
  findOne(
      @Param('id') id: number
  ): Promise<Object> {
      return this.companiesService.findOne(id)
  }

  @ApiOperation({ summary: "Update one company date" })
  @ApiResponse({ status: 200, type: Company })
  @Post('update/:id')
  update(
      @Param('id') id: number,
      @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<Object> {
      return this.companiesService.update(id, updateCompanyDto)
  }

  @ApiOperation({ summary: "Remove one company" })
  @ApiResponse({ status: 200 })
  @Delete('remove/:id')
  remove(
      @Param('id') id: number,
  ): Promise<Object | Number>{
      return this.companiesService.remove(id)
  }
}
