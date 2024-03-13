import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from './entities';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Color
      ]
    )
  ],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
