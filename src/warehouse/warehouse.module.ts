import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from 'src/files/files.module';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseController } from './warehouse.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Warehouse
      ]
    ),
    FilesModule
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}