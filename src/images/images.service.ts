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

    const newImage = await this.imageRepository.save({ ...createImageDto, name: process.env.API_URL+file });

    return { status: HttpStatus.CREATED, image: newImage };
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

    const file = await this.fileService.createFile(image);

    await this.imageRepository.update({ id }, {...updateImageDto, name: process.env.API_URL+file });

    const [ updated_image ] = await this.imageRepository.findBy({ id });

    return { status: HttpStatus.OK, image: updated_image };
  }

  async removeImage(id: number): Promise<Object> {
    const [ image ] = await this.imageRepository.findBy({ id });

    if (!image) return { status: HttpStatus.NOT_FOUND, message: 'Image not found' };

    await this.imageRepository.delete({ id });

    return HttpStatus.OK;
  }
}
