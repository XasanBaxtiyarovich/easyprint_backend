import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Size } from './entities';
import { CreateSizeDto, UpdateSizeDto } from './dto';

@Injectable()
export class SizeService {
  constructor( @InjectRepository(Size) private sizeRepository: Repository<Size> ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Object> {
    const [conflict_size] = await this.sizeRepository.findBy({ name: createSizeDto.name, category_id: createSizeDto.category_id });
    
    if (conflict_size) return { status: HttpStatus.CONFLICT, message: "Size already exists" };

    const new_size = await this.sizeRepository.save({ ...createSizeDto });

    return { status: HttpStatus.CREATED, size: new_size };
  }

  async findAll(): Promise<Object> {
    const sizes = await this.sizeRepository.find();

    if (sizes.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Sizes not found" };

    return { status: HttpStatus.OK, sizes };
  }

  async findOne(id: number): Promise<Object> {
    const [size] = await this.sizeRepository.findBy({ id });

    if (!size) return { status: HttpStatus.NOT_FOUND, message: "Size not found" };

    return { status: HttpStatus.OK, size };
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Object> {
    const [size] = await this.sizeRepository.findBy({ id });

    if (!size) return { status: HttpStatus.NOT_FOUND, message: "Size not found" };

    await this.sizeRepository.update({ id }, { ...updateSizeDto });

    const [updated_size] = await this.sizeRepository.findBy({ id });

    return { status: HttpStatus.OK, size: updated_size };
  }

  async remove(id: number): Promise<Object | Number> {
    const [size] = await this.sizeRepository.findBy({ id });

    if (!size) return { status: HttpStatus.NOT_FOUND, message: "Size not found" };

    await this.sizeRepository.delete({ id });

    return HttpStatus.OK;
  }
}
