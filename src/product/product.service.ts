import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities';
import { Category } from 'src/categories/entities';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto, UpdateProductDto } from './dto';

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
    try {
        const product = await this.productRepository.findOne({ where: { id }});

        if (!product) {
            return { status: HttpStatus.NOT_FOUND, message: "Product not found" };
        }
        
        if (files.length > 0) {
            for (const image of product.images) {
                const status = await this.fileService.removeFile(image.split('/')[3]);
                if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
            }
            
            const images = [];
            for (const file of files) {
                const image = await this.fileService.createFile(file);
                images.push(process.env.API_URL + image);
            }
            
            await this.productRepository.update({ id }, {...updateProductDto, images});
        } else {
            await this.productRepository.update({ id }, { ...updateProductDto });
        }

        return HttpStatus.OK;
    } catch (error) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" };
    }
  }

  async remove(id: number): Promise<HttpStatus | Object> {
    try {
        const product = await this.productRepository.findOne({ where: {id} });

        if (!product) {
            return { status: HttpStatus.NOT_FOUND, message: "Product not found" };
        }

        await this.productRepository.delete({ id });

        for (const image of product.images) {
            const status = await this.fileService.removeFile(image.split('/')[3]);
            if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    } catch (error) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" };
    }
  }
}