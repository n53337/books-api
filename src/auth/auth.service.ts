import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '@prisma/client';
const argon = require('argon2');

@Injectable()
export class AuthService {
   constructor(private readonly dbService: DbService) {}

   async register(creds: RegisterDto): Promise<User> {
      const { email, name, pwd } = creds;

      const hash = await argon.hash(pwd);
      try {
         const user = await this.dbService.user.create({
            data: {
               email,
               name,
               hash,
            },
         });
         delete user.hash;
         return user;
      } catch (error) {
         throw new ForbiddenException('This user is already exist !');
      }
   }

   //    async login(creds: LoginDto): Promise<string>{

   //    }
}
