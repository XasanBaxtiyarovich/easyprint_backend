import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Size } from './entities';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Size
      ]
    )
  ],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
