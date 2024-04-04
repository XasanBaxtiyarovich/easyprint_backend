import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';

import { Warehouse } from './entities';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto, GetWarehouseDto } from './dto';

@ApiTags('Warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiOperation({ summary: "Warehouse create" })
  @ApiResponse({ status: 200, type: Warehouse })
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: [],
    @Body() createWarehouseDto: CreateWarehouseDto
  ): Promise<Object | Number> {
    return this.warehouseService.create(createWarehouseDto, files);
  }

  @ApiOperation({ summary: "Find all warehouse" })
  @ApiResponse({ status: 200, type: [ Warehouse ] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.warehouseService.findAll();
  }

  @ApiOperation({ summary: "Find one warehouse" })
  @ApiResponse({ status: 200, type: Warehouse })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.warehouseService.findOne(+id);
  }

  @ApiOperation({ summary: "Find one warehouse" })
  @ApiResponse({ status: 200, type: Warehouse })
  @Post('findByProduct')
  findByProduct(
    @Body() getWarehouseDto: GetWarehouseDto
  ): Promise<Object> {
    return this.warehouseService.findByProduct(getWarehouseDto);
  }

  @ApiOperation({ summary: "Update one warehouse" })
  @ApiResponse({ status: 200, type: Warehouse })
  @Post('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: [],
    @Body() updateWarehouseDto: UpdateWarehouseDto
  ): Promise<Object | Number> {
    return this.warehouseService.update(+id, updateWarehouseDto, files);
  }

  @ApiOperation({ summary: "Delete one warehouse" })
  @ApiResponse({ status: 200, type: Warehouse })
  @Delete('remove/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.warehouseService.remove(+id);
  }
}
