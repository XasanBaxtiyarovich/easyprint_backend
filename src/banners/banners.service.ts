import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Banner } from './entities';
import { FilesService } from 'src/files/files.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private readonly BannerRepository: Repository<Banner>,
    private fileService: FilesService
  ) {}

  async create(createBannerDto: CreateBannerDto, images: []): Promise<HttpStatus> {
    try {
      const img_arr = [];
      const carousel = { carousel: [] };
  
      for (let i = 0; i < images.length; i++) {
          const file = await this.fileService.createFile(images[i]);
          const imageUrl = process.env.API_URL + file;
  
          if (i === 0) {
              img_arr.push({ banner: imageUrl });
          } else {
              carousel.carousel.push(imageUrl);
          }
      }
  
      img_arr.push(carousel);
  
      await this.BannerRepository.save({...createBannerDto, images: img_arr });
  
      return HttpStatus.CREATED;
    } catch (error) {
        console.error('Error occurred while creating banner:', error);
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async findAll(): Promise<Object> {
    try {
      const banners = await this.BannerRepository.find();
  
      if (banners.length === 0) {
          return { status: HttpStatus.NOT_FOUND, message: "Banners not found" };
      }
  
      const parsedBanners = banners.map(banner => {
          const images = banner.images.map(image => JSON.parse(image));
          return { ...banner, images };
      });
  
      return { status: HttpStatus.OK, parsedBanners };
    } catch (error) {
        console.error('Error occurred while fetching banners:', error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Failed to fetch banners" };
    }
  }

  async findOne(id: number): Promise<Object> {
    try {
      const banners = await this.BannerRepository.findBy({ id });
  
      if (banners.length === 0) {
          return { status: HttpStatus.NOT_FOUND, message: "Banner not found" };
      }
  
      const parsedBanners = banners.map(banner => {
          const images = banner.images.map(image => JSON.parse(image));
          return { ...banner, images };
      });
  
      return { status: HttpStatus.OK, parsedBanners };
    } catch (error) {
        console.error('Error occurred while fetching banner:', error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Failed to fetch banner" };
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto, images: []): Promise<Object> {
    try {
      const img_arr = [];
      const arr = [];
      const carousel = { carousel: [] };
  
      // If there are new images, update them
      if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
              const file = await this.fileService.createFile(images[i]);
              const imageUrl = process.env.API_URL + file;
  
              if (i === 0) {
                  img_arr.push({ banner: imageUrl });
              } else {
                  arr.push(imageUrl);
              }
          }
  
          carousel.carousel = arr;
          img_arr.push(carousel);
      }
  
      // Get the existing banner data
      const [ existingBanner ] = await this.BannerRepository.findBy({ id });
  
      // If new images are provided, update the banner with new images,
      // otherwise, retain the existing images
      const updatedBannerData = images && images.length > 0 ? { ...existingBanner, ...updateBannerDto, images: img_arr } : { ...existingBanner, ...updateBannerDto };
  
      // Update the banner
      await this.BannerRepository.update({ id }, updatedBannerData);
  
      return { status: HttpStatus.OK };
    } catch (error) {
        console.error('Error occurred while updating banner:', error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async remove(id: number): Promise<Object | Number> {
    try {
      const [banner] = await this.BannerRepository.findBy({ id });
  
      if (!banner) {
          return { status: HttpStatus.NOT_FOUND, message: "Banner not found" };
      }
  
      await this.BannerRepository.delete({ id });
  
      return { status: HttpStatus.OK };
    } catch (error) {
        console.error('Error occurred while deleting banner:', error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Failed to delete banner" };
    }
  }
}
