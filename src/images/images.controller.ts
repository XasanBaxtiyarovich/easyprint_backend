import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, HttpStatus, UseInterceptors, UploadedFile, Put } from '@nestjs/common';

import { Image } from './entities';
import { ImagesService } from './images.service';
import { CreateImageDto, UpdateImageDto } from './dto';

@ApiTags('Images')
@Controller('image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Create image' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Image })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createImage(
    @UploadedFile() image: [],
    @Body() createImageDto: CreateImageDto
  ): Promise<Object> {
    return this.imagesService.createImage(createImageDto, image);
  }


  @ApiOperation({ summary: 'Find all images' })
  @ApiResponse({ status: HttpStatus.OK, type: [ Image ] })
  @Get('findAll')
  findAllImages(): Promise<Object> {
    return this.imagesService.findAllImages();
  }

  @ApiOperation({ summary: 'Find one image' })
  @ApiResponse({ status: HttpStatus.OK, type: Image })
  @Get('find/:id')
  findOneImage(
    @Param('id') id: number
  ): Promise<Object> {
    return this.imagesService.findOneImage(id);
  }

  @ApiOperation({ summary: 'Create image' })
  @ApiResponse({ status: HttpStatus.OK, type: Image })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @Param('id') id: number,
    @UploadedFile() image: any,
    @Body() updateImageDto: UpdateImageDto
  ): Promise<Object> {
    return this.imagesService.updateImage(id, updateImageDto, image);
  }

  @ApiOperation({ summary: 'Delete image' })
  @ApiResponse({ status: HttpStatus.OK, type: Image })
  @Delete('delete/:id')
  removeImage(
    @Param('id') id: number
  ): Promise<Object> {
    return this.imagesService.removeImage(id);
  }
}
