import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Cupon } from './entities';
import { CreateCuponDto, UpdateCuponDto } from './dto';

@Injectable()
export class CuponsService {
  constructor(@InjectRepository(Cupon) private readonly cuponRepository: Repository<Cupon>) {}

  async create(createCuponDto: CreateCuponDto): Promise<Object> {
    const cupon = await this.cuponRepository.save({ ...createCuponDto });

    return { status: HttpStatus.CREATED, cupon };
  }

  async findAll(): Promise<Object> {
    const cupons = await this.cuponRepository.find();

    if (cupons.length === 0) return { status: HttpStatus.NOT_FOUND, message: "Cupons not found" };
    
    return { status: HttpStatus.OK, cupons };
  }

  async findOne(id: number): Promise<Object> {
    const [ cupon ] = await this.cuponRepository.findBy({ id });

    if (!cupon) return { status: HttpStatus.NOT_FOUND, message: "Cupon not found" };
    
    return { status: HttpStatus.OK, cupon };
  }

  async update(id: number, updateCuponDto: UpdateCuponDto): Promise<Object> {
    const [ cupon ] = await this.cuponRepository.findBy({ id });

    if (!cupon) return { status: HttpStatus.NOT_FOUND, message: "Cupon not found" };

    await this.cuponRepository.update({ id }, {...updateCuponDto});

    const [ updated_cupon ] = await this.cuponRepository.findBy({ id });    

    return { status: HttpStatus.OK, cupon: updated_cupon };
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const [ cupon ] = await this.cuponRepository.findBy({ id });

    if (!cupon) return { status: HttpStatus.NOT_FOUND, message: "Cupon not found" };

    await this.cuponRepository.delete({ id });

    return HttpStatus.OK;
  }
}
