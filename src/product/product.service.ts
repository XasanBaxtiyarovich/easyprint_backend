import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Category } from 'src/categories/entities';

@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(Product) private productRepository: Repository<Product>,
      @InjectRepository(Category) private categoryRepository: Repository<Category>,
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

    if (products.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Products not found" };

    return { status: HttpStatus.OK, products };
  }

  async findOne(id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    return { status: HttpStatus.OK, product };
  }

  async findByCategoryId(id: number): Promise<Object> {
    const products = await this.productRepository.findBy({ category_id: id });

    if (!products || products.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    return { status: HttpStatus.OK, products };
  }

  async findByCategory(id: number): Promise<Object> {
    const products = [];

    const product = await this.productRepository.find();
    const sub = await this.categoryRepository.find({ where: { parent_id: id, step: 1 }});

    for (let i = 0; i < sub.length; i++) {
      for (let j = 0; j < product.length; j++) {
        if (sub[i].id == product[j].category_id) products.push(product[j])
      }
    }
    
    if (!products || products.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };

    return { status: HttpStatus.OK, products };
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: []): Promise<HttpStatus | Object> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) return { status: HttpStatus.NOT_FOUND, message: "Product not found" };
    
    if (files.length > 0) {
      const images = [];
      
      for (let i = 0; i < product.images.length; i++) {
        const status = await this.fileService.removeFile(product.images[i].split('/')[3]);
  
        if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
      }

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

    for (let i = 0; i < product.images.length; i++) {
      const status = await this.fileService.removeFile(product.images[i].split('/')[3]);

      if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return HttpStatus.OK;
  }
}
