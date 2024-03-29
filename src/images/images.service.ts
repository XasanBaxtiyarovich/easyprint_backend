import fs from 'fs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Image } from './entities';
import { CreateImageDto, UpdateImageDto } from './dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ImagesService {
  constructor (
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private fileService: FilesService
  ) {}

  async createImage(createImageDto: CreateImageDto, image: any): Promise<Object> {
    const file = await this.fileService.createFile(image);

    await this.imageRepository.save({ ...createImageDto, name: process.env.API_URL+file });

    return { status: HttpStatus.CREATED };
  }

  async findAllImages(): Promise<Object> {
    const images = await this.imageRepository.find();
 
    if (images.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Images not found' };

    return { status: HttpStatus.OK, images };
  }

  async findOneImage(id: number): Promise<Object> {
    const [ image ] = await this.imageRepository.findBy({ id });

    if (!image) return { status: HttpStatus.NOT_FOUND, message: 'Image not found' };
    
    return { status: HttpStatus.OK, image };
  }

  async updateImage(id: number, updateImageDto: UpdateImageDto, image: any): Promise<Object> {
    const [ update_image ] = await this.imageRepository.findBy({ id });
    
    if (!update_image) return { status: HttpStatus.NOT_FOUND, message: 'Image not found' };

    if (image) {
      const file = await this.fileService.createFile(image);

      const status = await this.fileService.removeFile(update_image.name.split('/')[3])

      if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;

      await this.imageRepository.update({ id }, {...updateImageDto, name: process.env.API_URL+file });

      return { status: HttpStatus.OK };
    }

    await this.imageRepository.update({ id }, {...updateImageDto });

    return { status: HttpStatus.OK };
  }

  async removeImage(id: number): Promise<Object> {
    const [ image ] = await this.imageRepository.findBy({ id });

    if (!image) return { status: HttpStatus.NOT_FOUND, message: 'Image not found' };

    await this.imageRepository.delete({ id });

    const status = await this.fileService.removeFile(image.name.split('/')[3])

    if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
    
    return HttpStatus.OK;
  }
}
