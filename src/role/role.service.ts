import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Role } from './entities';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor( @InjectRepository(Role) private roleRepository: Repository<Role> ){}

  async createRole(createRoleDto: CreateRoleDto): Promise<Object> {
    const [ role ] =  await this.roleRepository.findBy({ name: createRoleDto.name });

    if (role) return { status: HttpStatus.CONFLICT, message: "Role already exists" };

    const new_role = await this.roleRepository.save({ ...createRoleDto });

    return { status: HttpStatus.OK, role: new_role };
  }

  async findAllRole(): Promise<Object> {
    const roles = await this.roleRepository.find();

    if (roles.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Roles not found' };

    return { status: HttpStatus.OK, roles };
  }

  async findOneRole(id: number): Promise<Object> {
    const [ role ] = await this.roleRepository.findBy({ id });

    if (!role) return { status: HttpStatus.NOT_FOUND, message: 'Role not found' };

    return { status: HttpStatus.OK, role };
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Object> {
    const [ role ] = await this.roleRepository.findBy({ id });
    if (!role) return { status: HttpStatus.NOT_FOUND, message: 'Role not found' };

    await this.roleRepository.update({ id }, { ...updateRoleDto });

    const updatedRole = await this.roleRepository.findBy({ id });

    return { status: HttpStatus.OK, role: updatedRole };
  }

  async removeRole(id: number): Promise<Object | HttpStatus> {
    const [ role ] = await this.roleRepository.findBy({ id });
    if(!role) return { status: HttpStatus.NOT_FOUND, message: 'Role not found' };

    await this.roleRepository.delete({ id });

    return HttpStatus.OK;
  }
}