import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Discount } from './entities';
import { Product } from 'src/product/entities';
import { Category } from '../categories/entities';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Discount, Category, Product
      ]
    )
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
