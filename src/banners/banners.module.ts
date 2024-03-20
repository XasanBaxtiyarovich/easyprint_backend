import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Banner } from './entities';
import { BannersService } from './banners.service';
import { FilesModule } from 'src/files/files.module';
import { BannersController } from './banners.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Banner
      ]
    ),
    FilesModule
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
