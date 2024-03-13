import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Size } from './entities';
import { SizeService } from './size.service';
import { CreateSizeDto, UpdateSizeDto } from './dto';


@ApiTags('Size')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @ApiOperation({ summary: "Size create" })
  @ApiResponse({ status: 201, type: Size })
  @Post('create')
  create(
    @Body() createSizeDto: CreateSizeDto
  ): Promise<Object> {
    return this.sizeService.create(createSizeDto);
  }

  @ApiOperation({ summary: "Sizies find all" })
  @ApiResponse({ status: 200, type: [ Size ] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.sizeService.findAll();
  }

  @ApiOperation({ summary: "Size find one" })
  @ApiResponse({ status: 200, type: Size })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.sizeService.findOne(+id);
  }

  @ApiOperation({ summary: "Sizies update one" })
  @ApiResponse({ status: 200, type: Size })
  @Post('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto
  ): Promise<Object> {
    return this.sizeService.update(+id, updateSizeDto);
  }

  @ApiOperation({ summary: "Size delete one" })
  @ApiResponse({ status: 200, type: Size })
  @Delete('delete/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.sizeService.remove(+id);
  }
}
