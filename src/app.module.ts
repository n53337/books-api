import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';

@Module({
   imports: [DbModule, AuthModule, BookModule],
})
export class AppModule {}
