import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   // Api Docs
   const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Books API Documentaion')
      .setDescription('The Official Books Api Documentation')
      .setVersion('1.0')
      .addTag('books')
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('docs', app, document);

   app.useGlobalPipes(new ValidationPipe());
   await app.listen(3000);
}
bootstrap();
