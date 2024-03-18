import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Cupon } from './entities';
import { CuponsService } from './cupons.service';
import { CreateCuponDto, UpdateCuponDto } from './dto';

@ApiTags('Cupons')
@Controller('cupon')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @ApiOperation({ summary: "Cupon create" })
  @ApiResponse({ status: 201, type: Cupon })
  @Post('create')
  create(
    @Body() createCuponDto: CreateCuponDto
  ): Promise<Object> {
    return this.cuponsService.create(createCuponDto);
  }

  @ApiOperation({ summary: "Find all cupons" })
  @ApiResponse({ status: 200, type: [ Cupon ] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.cuponsService.findAll();
  }

  @ApiOperation({ summary: "Find one cupon" })
  @ApiResponse({ status: 200, type: Cupon })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.cuponsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one cupon" })
  @ApiResponse({ status: 200, type: Cupon })
  @Post('update/:id')
  update(
    @Param('id') id: string, 
    @Body() updateCuponDto: UpdateCuponDto
  ): Promise<Object> {
    return this.cuponsService.update(+id, updateCuponDto);
  }

  @ApiOperation({ summary: "Delete one cupon" })
  @ApiResponse({ status: 200, type: Cupon })
  @Delete('delete/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.cuponsService.remove(+id);
  }
}
