import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities';
import { Role } from 'src/role/entities';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Users, Role
      ]
    ),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
