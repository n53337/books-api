import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.metadata';

@Controller('book')
export class BookController {
   @Public()
   @Get('all')
   getAll() {
      return 'All Books';
   }
}
