import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Category } from './entities';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, PadCategoryAddDto } from './dto'

@ApiTags('Category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Category create" })
  @ApiResponse({ status: 200, type: Category })
  @Post('create')
  create(
      @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Object> {
      return this.categoriesService.create(createCategoryDto)
  }

  @ApiOperation({ summary: "Add pad category" })
  @ApiResponse({ status: 200, type: Category })
  @Post('add-pad')
  add_pad_category(
      @Body() padCategoryAddDto: PadCategoryAddDto
  ): Promise<Object> {
      return this.categoriesService.add_pad_category(padCategoryAddDto)
  }

  @ApiOperation({ summary: "Find all categories" })
  @ApiResponse({ status: 200, type: [ Category ] })
  @Get('findAllCategory')
  findAllCategory(): Promise<Object> {
      return this.categoriesService.findAllCategory()
  }

  @ApiOperation({ summary: "Find all sub categories" })
  @ApiResponse({ status: 200, type: [ Category ] })
  @Get('findAllSubCategory')
  findAllSubCategory(): Promise<Object> {
      return this.categoriesService.findAllSubCategory()
  }

  @ApiOperation({ summary: "Find one category" })
  @ApiResponse({ status: 200, type: Category})
  @Get('find/:id')
  findOne(
      @Param('id') id: number
  ): Promise<Object> {
      return this.categoriesService.findOne(id)
  }

  @ApiOperation({ summary: "Update one category date" })
  @ApiResponse({ status: 200, type: Category })
  @Post('update/:id')
  update(
      @Param('id') id: number,
      @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Object> {
      return this.categoriesService.update(id, updateCategoryDto)
  }

  @ApiOperation({ summary: "Remove one category" })
  @ApiResponse({ status: 200 })
  @Delete('remove/:id')
  remove(
      @Param('id') id: number,
  ): Promise<Object | Number>{
      return this.categoriesService.remove(id)
  }
}
