import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { ProductService } from './product.service';
import { FilesModule } from 'src/files/files.module';
import { ProductController } from './product.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product
      ]
    ),
    FilesModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
