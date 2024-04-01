import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Warehouse } from './entities';
import { FilesService } from 'src/files/files.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';


@Injectable()
export class WarehouseService {
  constructor(
    private fileService: FilesService,
    @InjectRepository(Warehouse) private warehouseRepository: Repository<Warehouse>
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto, files: []): Promise<Object | Number> {
    const images = [];

    for (const image of files) {
        const file = await this.fileService.createFile(image);
        const imageUrl = process.env.API_URL + file;
        
        images.push(imageUrl);
    }

    try {
        await this.warehouseRepository.save({ ...createWarehouseDto, images });

        return HttpStatus.CREATED;
    } catch (error) {
        throw new Error("Error occurred while saving warehouse data: " + error.message);
    }
  }

  async findAll(): Promise<Object | Number> {
    try {
        const warehouses = await this.warehouseRepository.find();

        if (warehouses.length === 0) {
            return { status: HttpStatus.NOT_FOUND, message: "Warehouses not found" };
        }

        return { status: HttpStatus.OK, warehouses };
    } catch (error) {
        throw new Error("Error occurred while fetching warehouses: " + error.message);
    }
  }

  async findOne(id: number): Promise<Object | Number> {
    try {
        const warehouse = await this.warehouseRepository.findOne({ where: { id } });

        if (!warehouse) {
            return { status: HttpStatus.NOT_FOUND };
        }

        return { status: HttpStatus.OK, warehouse };
    } catch (error) {
        throw new Error("Error occurred while fetching warehouse: " + error.message);
    }
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto, files: []): Promise<Object | Number> {
    try {
        const warehouse = await this.warehouseRepository.findOne({ where: { id } });

        if (!warehouse) {
            return { status: HttpStatus.NOT_FOUND, message: "Warehouse not found" };
        }
        
        if (files.length > 0) {
            for (const image of warehouse.images) {
                const status = await this.fileService.removeFile(image.split('/')[3]);
                if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
            }
            
            const images = [];
            for (const file of files) {
                const image = await this.fileService.createFile(file);
                images.push(process.env.API_URL + image);
            }
            
            await this.warehouseRepository.update({ id }, {...updateWarehouseDto, images});
        } else {
            await this.warehouseRepository.update({ id }, { ...updateWarehouseDto });
        }

        return HttpStatus.OK;
    } catch (error) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" };
    }
  }

  async remove(id: number): Promise<Object | Number> {
    const [ warehouse ] = await this.warehouseRepository.findBy({ id });

    if (!warehouse) return { status: HttpStatus.NOT_FOUND, message: "Warehouse not found" };

    await this.warehouseRepository.delete({ id });

    for (let i = 0; i < warehouse.images.length; i++) {
      const status = await this.fileService.removeFile(warehouse.images[i].split('/')[3]);

      if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return HttpStatus.OK;
  }
}