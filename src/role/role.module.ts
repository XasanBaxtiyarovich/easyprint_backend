import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities';
import { Users } from 'src/users/entities';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature(
        [
            Role, Users
        ]
    ),
],
  controllers: [ RoleController ],
  providers: [ RoleService ],
})
export class RoleModule {}