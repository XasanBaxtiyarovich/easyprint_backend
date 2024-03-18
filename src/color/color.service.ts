import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Color } from './entities';
import { CreateColorDto, UpdateColorDto } from './dto';

@Injectable()
export class ColorService {
  constructor(@InjectRepository(Color) private colorRepository: Repository<Color>) {}

  async create(createColorDto: CreateColorDto): Promise<Object> {
    const [conflict_color] = await this.colorRepository.findBy({ name: createColorDto.name, code: createColorDto.code });

    if (conflict_color) return { status: HttpStatus.CONFLICT, message: "Color already exsist" };

    const color = await this.colorRepository.save({ ...createColorDto });

    return { status: HttpStatus.CREATED, color };
  }

  async findAll(): Promise<Object> {
    const colors = await this.colorRepository.find();

    if (colors.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Colors not found" };
    
    return { status: HttpStatus.OK, colors };
  }

  async findOne(id: number): Promise<Object> {
    const [color] = await this.colorRepository.findBy({ id });

    if (!color) return { status: HttpStatus.NOT_FOUND, message: 'Color not found' };

    return { status: HttpStatus.OK, color };
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Object> {
    const [color] = await this.colorRepository.findBy({ id });

    if (!color) return { status: HttpStatus.NOT_FOUND, message: 'Color not found' };

    const [ color_conflict ] =  await this.colorRepository.findBy({ name: updateColorDto.name, code: updateColorDto.code });

    if (color_conflict && color_conflict.id != id) 
      return { status: HttpStatus.CONFLICT, message: "Color already exists" };

    await this.colorRepository.update({ id }, { ...updateColorDto });

    const update_color = await this.colorRepository.findBy({ id });

    return { status: HttpStatus.OK, color: update_color };
  }

  async remove(id: number): Promise<Object> {
    const [color] = await this.colorRepository.findBy({ id });

    if (!color) return { status: HttpStatus.NOT_FOUND, color };

    await this.colorRepository.delete({ id });

    return HttpStatus.OK;
  }
}
