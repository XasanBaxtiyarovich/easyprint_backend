import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';

import { Product } from './entities';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "Product create" })
  @ApiResponse({ status: 200, type: Product })
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: [],
    @Body() createProductDto: CreateProductDto
  ): Promise<Object | Number> {
    return this.productService.create(createProductDto, files);
  }

  @ApiOperation({ summary: "Find all products" })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: "Find one product" })
  @ApiResponse({ status: 200, type: Product })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one product" })
  @ApiResponse({ status: 200, type: Product })
  @Post('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: [],
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Object | Number> {
    return this.productService.update(+id, updateProductDto, files);
  }

  @ApiOperation({ summary: "Delete one product" })
  @ApiResponse({ status: 200, type: Product })
  @Delete('remove/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.productService.remove(+id);
  }
}
