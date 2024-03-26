import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Discount } from './entities';
import { Product } from '../product/entities';
import { Category } from '../categories/entities';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Discount) private readonly discountRepo: Repository<Discount>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Object> {
    const products = await this.productRepo.find();
    const discounts = await this.discountRepo.find();

    const discount_number = (discounts.length ? discounts[discounts.length - 1].discount_number : 0) + 1;
    if (createDiscountDto.category_id === 0 && createDiscountDto.sub_category_id === undefined && createDiscountDto.product_id === undefined ) {

      for (let i = 0; i < products.length; i++) {
        await this.discountRepo.save({
          parcent: createDiscountDto.parcent,
          product_id: products[i].id,
          category_id: products[i].category_id,
          discount_number: discount_number,
          start_date: createDiscountDto.start_date,
          end_date: createDiscountDto.end_date
        })
      }
      return { status: HttpStatus.OK };
    } else if (createDiscountDto.category_id && createDiscountDto.sub_category_id === 0 && createDiscountDto.product_id === undefined ) {
      const categories = await this.categoryRepo.find({ where: { parent_id: createDiscountDto.category_id }});

      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (products[i].category_id === categories[j].id) {
            await this.discountRepo.save({
              parcent: createDiscountDto.parcent,
              product_id: products[i].id,
              category_id: products[i].category_id,
              discount_number: discount_number,
              start_date: createDiscountDto.start_date,
              end_date: createDiscountDto.end_date
            })
          }
        }
      }
      return { status: HttpStatus.OK };
    } else if (createDiscountDto.category_id && createDiscountDto.sub_category_id && createDiscountDto.product_id === 0 ) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].category_id === createDiscountDto.sub_category_id) {
          await this.discountRepo.save({
            parcent: createDiscountDto.parcent,
            product_id: products[i].id,
            category_id: products[i].category_id,
            discount_number: discount_number,
            start_date: createDiscountDto.start_date,
            end_date: createDiscountDto.end_date
          })
        }   
      }
      return { status: HttpStatus.OK };
    } else if (createDiscountDto.category_id && createDiscountDto.sub_category_id && createDiscountDto.product_id ) {
      await this.discountRepo.save({
        parcent: createDiscountDto.parcent,
        product_id: createDiscountDto.product_id,
        category_id: createDiscountDto.sub_category_id,
        discount_number: discount_number,
        start_date: createDiscountDto.start_date,
        end_date: createDiscountDto.end_date
      })
      return { status: HttpStatus.OK };
    } else if (createDiscountDto.category_id === undefined && createDiscountDto.sub_category_id === undefined && createDiscountDto.product_id === undefined ) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    } else {
      console.log(createDiscountDto.category_id);
      console.log(createDiscountDto.sub_category_id);
      console.log(createDiscountDto.product_id);
    }
  }

  async findAll(): Promise<Object> {
    const discounts = await this.discountRepo.find();

    if (discounts.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Discounts not found' };

    return { status: HttpStatus.OK, discounts };
  }

  async findOne(id: number): Promise<Object> {
    const [discount]  = await this.discountRepo.findBy({ id });

    if (!discount) return { status: HttpStatus.NOT_FOUND, message: "Discount not found" };

    return { status: HttpStatus.OK, discount };
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto): Promise<Object> {
    const discount = await this.discountRepo.findBy({ id });

    await this.discountRepo.update({ id }, {...updateDiscountDto });

    return { status: HttpStatus.OK };
  }

  async remove(id: number): Promise<Object> {
    const [discount]  = await this.discountRepo.findBy({ discount_number: id });

    if (!discount) return { status: HttpStatus.NOT_FOUND, message: "Discount not found" };

    await this.discountRepo.delete({ id });
  
    return { status: HttpStatus.OK };
  }
}
