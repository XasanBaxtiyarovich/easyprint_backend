import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Image } from './entities';
import { ImagesService } from './images.service';
import { FilesModule } from 'src/files/files.module';
import { ImagesController } from './images.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature(
        [
          Image
        ]
    ),
    FilesModule
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
