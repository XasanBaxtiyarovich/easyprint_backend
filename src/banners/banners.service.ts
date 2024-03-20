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
    let count = 0;
    const arr = [];
    const img_arr = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const file = await this.fileService.createFile(image);

      if (count === 0) {
        const banner = { banner: process.env.API_URL+file };

        img_arr.push(banner);

        count++;
      } else {
        arr.push(process.env.API_URL+file);
      }
    }
    const carousel = { carousel: arr };

    img_arr.push(carousel);


    await this.BannerRepository.save({...createBannerDto, images: img_arr });

    return HttpStatus.CREATED;
  }

  async findAll(): Promise<Object> {
    const banners = await this.BannerRepository.find();

    if (banners.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Banners not found" };

    return { status: HttpStatus.OK, banners };
  }

  async findOne(id: number): Promise<Object> {
    const [ banner ] = await this.BannerRepository.findBy({ id });

    if (!banner) return { status: HttpStatus.NOT_FOUND, message: "Banner not found" };

    return { status: HttpStatus.OK, banner };
  }

  async remove(id: number): Promise<Object | Number> {
    const [ banner ] = await this.BannerRepository.findBy({ id });

    if (!banner) return { status: HttpStatus.NOT_FOUND, message: "Banner not found" };

    await this.BannerRepository.delete({id});

    return HttpStatus.OK;
  }
}
