import {
   Body,
   Controller,
   ForbiddenException,
   Get,
   Post,
   Req,
   UploadedFile,
   UploadedFiles,
   UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.metadata';
import { NewBookTdo } from './book.dto';
import { Request } from 'express';
import { BookService } from './book.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Controller('book')
export class BookController {
   constructor(private readonly bookService: BookService) {}

   @Get('all')
   async getAll() {
      const response = await this.bookService.allBooks();

      return response;
   }

   @Post('new')
   async newBook(@Req() req: Request, @Body() book: NewBookTdo) {
      book.authorId = req.user['userId'];

      const response = await this.bookService.newBook(book);
      return response;
   }

   @Post('upload')
   @UseInterceptors(
      FileInterceptor('file', {
         storage: diskStorage({
            destination: (req, file, callback) => {
               const uploadFolder = './uploads/books';
               if (!fs.existsSync(uploadFolder)) {
                  fs.mkdirSync(uploadFolder, { recursive: true });
               }
               callback(null, uploadFolder);
            },
            filename: (req, file, callback) => {
               const uniqueSuffix =
                  Date.now() + '-' + Math.round(Math.random() * 1e9);
               const filename = `${uniqueSuffix}-${file.originalname}`;
               callback(null, filename);
            },
         }),
         fileFilter(req, file, callback) {
            if (file.mimetype == 'application/pdf') {
               callback(null, true);
            } else {
               callback(
                  new ForbiddenException("The file isn't a pdf format"),
                  false,
               );
            }
         },
      }),
   )
   async uploadBook(@UploadedFile() file: Express.Multer.File) {
      try {
      } catch (error) {
         throw new ForbiddenException(error.message);
      }
      return {
         message: 'File Uploaded Successfully',
         data: { downloadLink: file.path },
      };
   }
}
