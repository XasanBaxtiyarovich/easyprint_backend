import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Discount } from './entities';
import { DiscountService } from './discount.service';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@ApiTags('Discount')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({ summary: "Discount create" })
  @ApiResponse({ status: 201, type: Discount })
  @Post('create')
  create(
    @Body() createDiscountDto: CreateDiscountDto
  ): Promise<Object> {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: "Discounts find all" })
  @ApiResponse({ status: 201, type: [Discount] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.discountService.findAll();
  }

  @ApiOperation({ summary: "Discount find" })
  @ApiResponse({ status: 201, type: Discount })
  @Get('find/:id')
  findOne(
    @Param('id') id: number
  ): Promise<Object> {
    return this.discountService.findOne(id);
  }

  @ApiOperation({ summary: "Discount update" })
  @ApiResponse({ status: 200, type: Discount })
  @Post('update/:id')
  update(
    @Param('id') id: string, 
    @Body() updateDiscountDto: UpdateDiscountDto
  ): Promise<Object> {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @ApiOperation({ summary: "Discount remove" })
  @ApiResponse({ status: 200, type: Discount })
  @Delete('delete/:id')
  remove(
    @Param('id') id: number
  ): Promise<Object> {
    return this.discountService.remove(id);
  }
}
