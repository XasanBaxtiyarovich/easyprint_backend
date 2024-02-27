import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';

import { Role } from './entities';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post('create')
  createRole(
    @Body() createRoleDto: CreateRoleDto
  ): Promise<Object> {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "Find all roles" })
  @ApiResponse({ status: HttpStatus.OK, type: [ Role ] })
  @Get('findAll')
  findAllRole(): Promise<Object> {
    return this.roleService.findAllRole();
  }

  @ApiOperation({ summary: "Find one role" })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get('find/:id')
  findOneRole(
    @Param('id') id: number
  ): Promise<Object> {
    return this.roleService.findOneRole(id);
  }

  @ApiOperation({ summary: "Update one role" })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Put('update/:id')
  updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Object> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @ApiOperation({ summary: "Remove one role" })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Delete('delete/:id')
  removeRole(
    @Param('id') id: number
  ): Promise<Object> {
    return this.roleService.removeRole(id);
  }
}
