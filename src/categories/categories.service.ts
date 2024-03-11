import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Category } from './entities';
import { CreateCategoryDto, PadCategoryAddDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Object> {
    const [ category ] =  await this.categoryRepo.findBy({ name: createCategoryDto.name });
  
    if(category) return { status: HttpStatus.CONFLICT, message: "Category name already exists" } 

    const new_category = await this.categoryRepo.save({ ...createCategoryDto });  
    
    return { status: HttpStatus.CREATED, category: new_category };
  }

  async add_pad_category(padCategoryAddDto: PadCategoryAddDto): Promise<Object> {
    const [ parent_category ] = await this.categoryRepo.findBy({ id: padCategoryAddDto.parent_id });
        
    if(!parent_category) return { status: HttpStatus.NOT_FOUND, message: 'Parent category not found' }

    // parent_category.name != 'T-shirts' && parent_category.name != 'Sweatshirts'  && parent_category.name != 'Hoodies' && parent_category.name  != 'Accessories'

    if(parent_category.step == 1) {
      return { status: HttpStatus.NOT_FOUND, message: 'Parent category not found' } 
    }

    const category = await this.categoryRepo.save({ ...padCategoryAddDto, step: 1 });
  
    return { status: HttpStatus.OK, category };
  }

  async findAllCategory(): Promise<Object> {
    const categories = await this.categoryRepo.find({ where: {step: 0}});

    if(categories.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Categories not found' }
    
    return { status: HttpStatus.OK, categories }
  }

  async findAllSubCategory(): Promise<Object> {
    const categories = await this.categoryRepo.find({ where: {step: 1}});

    if(categories.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Categories not found' }
    
    return { status: HttpStatus.OK, categories }
  }

  async findOne(id: number): Promise<Object> {
    const [ category ] = await this.categoryRepo.findBy({ id });

    if(!category) return { status: HttpStatus.NOT_FOUND, message: 'Category not found' }

    return { status: HttpStatus.OK, category };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Object> {
    const [ category ] = await this.categoryRepo.findBy({ id });
        
    if (!category) return { status: HttpStatus.NOT_FOUND, message: 'Category not found' };

    if (updateCategoryDto.parent_id !== null) {
      const [parent_category] = await this.categoryRepo.findBy({ id: updateCategoryDto.parent_id });

      if (!parent_category) return { status: HttpStatus.NOT_FOUND, message: 'Parent category not found' }
    }

    await this.categoryRepo.update({ id }, { ...updateCategoryDto });

    const updated_category = await this.categoryRepo.findBy({ id });
    
    return { status: HttpStatus.OK, updated_category };
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const [ category ] = await this.categoryRepo.findBy({ id });

    if(!category) return { status: HttpStatus.NOT_FOUND, message: 'Category not found' }
  
    await this.categoryRepo.delete({ id });

    return HttpStatus.OK;
  }
}