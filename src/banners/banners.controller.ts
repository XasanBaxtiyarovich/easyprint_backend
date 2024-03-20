import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus } from '@nestjs/common';

import { Banner } from './entities';
import { BannersService } from './banners.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';

@ApiTags('Banners')
@Controller('banner')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: "Banner create" })
  @ApiResponse({ status: 200, type: Banner })
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: [],
    @Body() createBannerDto: CreateBannerDto
  ): Promise<HttpStatus> {
    return await this.bannersService.create(createBannerDto, images);
  }
  
  @ApiOperation({ summary: "Find all banners" })
  @ApiResponse({ status: 200, type: [ Banner ] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.bannersService.findAll();
  }

  @ApiOperation({ summary: "Find one banner" })
  @ApiResponse({ status: 200, type: Banner })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.bannersService.findOne(+id);
  }

  @ApiOperation({ summary: "Delete one banner" })
  @ApiResponse({ status: 200, type: Banner })
  @Delete('delete/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object> {
    return this.bannersService.remove(+id);
  }
}
