import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from 'src/files/files.module';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseController } from './warehouse.controller';
import { Product } from 'src/product/entities';
import { Color } from 'src/color/entities';
import { Size } from 'src/size/entities';
import { Category } from 'src/categories/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Warehouse, Product, Color, Size, Category
      ]
    ),
    FilesModule
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}