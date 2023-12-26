import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
   imports: [MulterModule.register({ dest: __dirname + '/../../uploads' })],
   controllers: [BookController],
   providers: [BookService],
})
export class BookModule {}
