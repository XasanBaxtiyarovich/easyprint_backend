import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';


const start = async() => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('EasyPrint')
  .setDescription('easyprint online shop')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgress, TypeORM, JWT, Swagger')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  
  const PORT = process.env.API_PORT || 3333;
  await app.listen(PORT, () => {
    console.log(`SERVER RUNING IN PORT: "${PORT}"`);
  });
}
start();