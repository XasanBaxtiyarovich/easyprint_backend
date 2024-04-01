import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Discount } from './entities';
import { Product } from '../product/entities';
import { Category } from '../categories/entities';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Object> {
    const products = await this.productRepo.find();
    const discounts = await this.discountRepo.find();

    const discount_number = (discounts.length ? discounts[discounts.length - 1].discount_number : 0) + 1;
    if (createDiscountDto.category_id == 0 && createDiscountDto.sub_category_id === undefined && createDiscountDto.product_id === undefined ) {

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
    const discountsDistinct = await this.discountRepo
      .createQueryBuilder('discount')
      .select('DISTINCT discount.discount_number', 'discount_number')
      .getRawMany();

    const discountsData = [];

    for (const discountDistinct of discountsDistinct) {
      const category = [];
      const subcategory = [];

      const discountNumber = await this.discountRepo.count({
        where: { discount_number: discountDistinct.discount_number },
      });

      const discountData = await this.discountRepo.find({
        where: { discount_number: discountDistinct.discount_number },
      });

      for (const discountDataItem of discountData) {
        const [ category_1 ] = await this.categoryRepo.findBy({id: discountDataItem.category_id, step: 0 });
        const [ subCategory_1 ] = await this.categoryRepo.findBy({id: discountDataItem.category_id, step: 1 });
        const [ product ] = await this.productRepo.findBy({ id: discountDataItem.product_id });

        if (product) {
          discountDataItem.product_id = product;
        }

        if (category_1) {
            if (!category.includes(category_1.name)) {
              category.push(category_1.name);
            }
            subcategory.push(1, 2);
        } else if (subCategory_1) {
            if (!subcategory.includes(subCategory_1.name)) {
              subcategory.push(subCategory_1.name);
            }
            const [category_2] = await this.categoryRepo.findBy({id: subCategory_1.parent_id, step: 0 });
            
            if (category_2) {
              if (!category.includes(category_2.name)) {
                category.push(category_2.name);
              }
            }
        } 
      }

      if (category.length === 1) {
        category.length = 1;
      } else if (category.length > 1) {
        category.length = 1;
        category[0] = 'All categories';
      } else {
        category.length = 1;
        category[0] = '';
      }

      if (subcategory.length === 1) {
        subcategory.length = 1;
      } else if (subcategory.length > 1) {
        subcategory.length = 1;
        subcategory[0] = 'All subcategories';
      } else {
        subcategory.length = 1;
        subcategory[0] = '';
      }

      discountsData.push({
        discount: discountData,
        number: discountNumber,
        category: category,
        subcategory: subcategory,
      });
    }

    return { discounts: discountsData };
  }

  async findOne(id: number): Promise<Object> {
    try {
      const discounts = await this.discountRepo.find({ where: { discount_number: id } });
  
      if (!discounts || discounts.length === 0) {
          return { status: HttpStatus.NOT_FOUND, message: "Discount not found" };
      }
  
      const productIds = discounts.map(discount => discount.product_id);
      const categoryIds = discounts.map(discount => discount.category_id);
  
      const products = await this.productRepo.findByIds(productIds);
      const categories = await this.categoryRepo.findByIds(categoryIds);
  
      const productsMap = products.reduce((map, product) => {
          map[product.id] = product;
          return map;
      }, {});
  
      const categoriesMap = categories.reduce((map, category) => {
          map[category.id] = category;
          return map;
      }, {});
  
      discounts.forEach(discount => {
          discount.product_id = productsMap[discount.product_id];
          discount.category_id = categoriesMap[discount.category_id];
      });
  
      return { status: HttpStatus.OK, discounts, number: discounts.length };
    } catch (error) {
        console.error("Error fetching discounts:", error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" };
    }
  
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto): Promise<Object> {
    this.remove(id);

    const products = await this.productRepo.find();
    const discounts = await this.discountRepo.find();

    const discount_number = (discounts.length ? discounts[discounts.length - 1].discount_number : 0) + 1;
    if (updateDiscountDto.category_id == 0 && updateDiscountDto.sub_category_id === undefined && updateDiscountDto.product_id === undefined ) {

      for (let i = 0; i < products.length; i++) {
        await this.discountRepo.save({
          parcent: updateDiscountDto.parcent,
          product_id: products[i].id,
          category_id: products[i].category_id,
          discount_number: discount_number,
          start_date: updateDiscountDto.start_date,
          end_date: updateDiscountDto.end_date
        })
      }
      return { status: HttpStatus.OK };
    } else if (updateDiscountDto.category_id && updateDiscountDto.sub_category_id === 0 && updateDiscountDto.product_id === undefined ) {
      const categories = await this.categoryRepo.find({ where: { parent_id: updateDiscountDto.category_id }});

      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (products[i].category_id === categories[j].id) {
            await this.discountRepo.save({
              parcent: updateDiscountDto.parcent,
              product_id: products[i].id,
              category_id: products[i].category_id,
              discount_number: discount_number,
              start_date: updateDiscountDto.start_date,
              end_date: updateDiscountDto.end_date
            })
          }
        }
      }
      return { status: HttpStatus.OK };
    } else if (updateDiscountDto.category_id && updateDiscountDto.sub_category_id && updateDiscountDto.product_id === 0 ) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].category_id === updateDiscountDto.sub_category_id) {
          await this.discountRepo.save({
            parcent: updateDiscountDto.parcent,
            product_id: products[i].id,
            category_id: products[i].category_id,
            discount_number: discount_number,
            start_date: updateDiscountDto.start_date,
            end_date: updateDiscountDto.end_date
          })
        }   
      }
      return { status: HttpStatus.OK };
    } else if (updateDiscountDto.category_id && updateDiscountDto.sub_category_id && updateDiscountDto.product_id ) {
      await this.discountRepo.save({
        parcent: updateDiscountDto.parcent,
        product_id: updateDiscountDto.product_id,
        category_id: updateDiscountDto.sub_category_id,
        discount_number: discount_number,
        start_date: updateDiscountDto.start_date,
        end_date: updateDiscountDto.end_date
      })
      return { status: HttpStatus.OK };
    } else if (updateDiscountDto.category_id === undefined && updateDiscountDto.sub_category_id === undefined && updateDiscountDto.product_id === undefined ) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    } else {
      console.log(updateDiscountDto.category_id);
      console.log(updateDiscountDto.sub_category_id);
      console.log(updateDiscountDto.product_id);
    }updateDiscountDto
  }

  async remove(id: number): Promise<Object> {
    try {
      const deletedDiscounts = await this.discountRepo.delete({ discount_number: id });
  
      if (deletedDiscounts.affected === 0) {
          return { status: HttpStatus.NOT_FOUND, message: "Discounts not found" };
      }
  
      return { status: HttpStatus.OK };
    } catch (error) {
        console.error("Error deleting discounts:", error);
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal server error" };
    }
  }
}
