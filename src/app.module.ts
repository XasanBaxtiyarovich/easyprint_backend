import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Role } from './role/entities';
import { Users } from './users/entities';
import { Image } from './images/entities';
import { Product } from './product/entities';
import { Company } from './companies/entities';
import { Category } from './categories/entities';
import { Size } from './size/entities/size.entity';

import { RoleModule } from './role/role.module';
import { SizeModule } from './size/size.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { ProductModule } from './product/product.module';
import { CompaniesModule } from './companies/companies.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Role, Image, Users, Company, Category, Product, Size ],
      synchronize: true,
    }),

    RoleModule,

    ImagesModule,

    UsersModule,

    CompaniesModule,

    CategoriesModule,

    ProductModule,

    SizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}