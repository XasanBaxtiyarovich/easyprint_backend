import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto, UpdateProductDto } from './dto';


@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(Product) private productRepository: Repository<Product>,
      private fileService: FilesService
    ) {}

  async create(createProductDto: CreateProductDto, files: []): Promise<Object> {
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      const file = await this.fileService.createFile(image);

      images.push(process.env.API_URL+file);
    }

    await this.productRepository.save({ ...createProductDto, images });  
    
    return HttpStatus.CREATED;
  }

  async findAll(): Promise<Object> {
    const products = await this.productRepository.find();

    if (!products) return { status: HttpStatus.NOT_FOUND, message: "Products not found" };

    return { status: HttpStatus.OK, products };
  }

  async findOne(id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    return { status: HttpStatus.OK, product };
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: []): Promise<HttpStatus | Object> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    if (files.length > 0) {
      const images = [];

      for (let i = 0; i < files.length; i++) {
        const image = files[i];
  
        const file = await this.fileService.createFile(image);
  
        images.push(process.env.API_URL+file);
      }
  
      await this.productRepository.update({ id }, {...updateProductDto, images});

      return HttpStatus.OK;
    }
    
    await this.productRepository.update({ id }, {...updateProductDto});

    return HttpStatus.OK;
  }

  async remove(id: number): Promise<HttpStatus | Object> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    await this.productRepository.delete({ id });

    return HttpStatus.OK;
  }
}
