import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { NewBookTdo } from './book.dto';

@Injectable()
export class BookService {
   constructor(private readonly dbService: DbService) {}

   async allBooks() {
      try {
         const books = await this.dbService.book.findMany();

         return { books: books };
      } catch (error) {
         throw new ForbiddenException('an error accur while getting all books');
      }
   }

   async newBook(book: NewBookTdo) {
      try {
         const newBook = await this.dbService.book.create({
            data: {
               name: book.name,
               authorId: book.authorId,
            },
         });

         return { message: 'book created successfully', book: newBook };
      } catch (error) {
         throw new ForbiddenException('an error accur while creating new book');
      }
   }
}
