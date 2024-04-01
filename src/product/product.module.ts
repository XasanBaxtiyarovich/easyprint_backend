import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { Category } from 'src/categories/entities';
import { ProductService } from './product.service';
import { FilesModule } from 'src/files/files.module';
import { ProductController } from './product.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product, Category
      ]
    ),
    FilesModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
