import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonalInfo } from './entities';
import { Users } from 'src/users/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PersonalInfo, Users
      ]
    )
  ],
  controllers: [],
  providers: [],
})
export class PersonalInfosModule {}
