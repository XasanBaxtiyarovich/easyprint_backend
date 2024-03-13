import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Color } from './entities';
import { ColorService } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dto'

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOperation({ summary: "Color create" })
  @ApiResponse({ status: 201, type: Color })
  @Post('create')
  create(
    @Body() createColorDto: CreateColorDto
  ): Promise<Object> {
    return this.colorService.create(createColorDto);
  }

  @ApiOperation({ summary: "Colors find all" })
  @ApiResponse({ status: 201, type: [ Color ] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.colorService.findAll();
  }

  @ApiOperation({ summary: "Color find one" })
  @ApiResponse({ status: 201, type: Color })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.colorService.findOne(+id);
  }

  @ApiOperation({ summary: "Color update one" })
  @ApiResponse({ status: 201, type: Color })
  @Post('update/:id')
  update(
    @Param('id') id: string, 
    @Body() updateColorDto: UpdateColorDto
  ): Promise<Object> {
    return this.colorService.update(+id, updateColorDto);
  }

  @ApiOperation({ summary: "Color delete one" })
  @ApiResponse({ status: 201, type: Color })
  @Delete('delete/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.colorService.remove(+id);
  }
}
