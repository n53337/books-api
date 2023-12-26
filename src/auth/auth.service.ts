import {
   ForbiddenException,
   Global,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { env } from 'process';

@Injectable()
export class AuthService {
   constructor(
      private readonly dbService: DbService,
      private readonly jwtService: JwtService,
   ) {}

   // Register New User
   async register(creds: RegisterDto): Promise<User> {
      const { email, name, pwd } = creds;

      const hash = await argon2.hash(pwd);
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

   // User Login
   async login(creds: LoginDto): Promise<string> {
      const user = await this.dbService.user.findUnique({
         where: {
            email: creds.email,
         },
      });

      if (!user)
         throw new UnauthorizedException(
            'No account found with this email, you must register first !',
         );

      const isHashValid = await argon2.verify(user.hash, creds.pwd);

      if (!isHashValid) throw new UnauthorizedException('Wrong Password !');

      const token = await this.jwtService.signAsync(
         {
            sub: user.id,
         },
         { secret: process.env.JWT_SECRET },
      );

      // Whitelist the token
      await this.dbService.accessToken.create({
         data: {
            token,
         },
      });

      return token;
   }

   async logOut(token: string) {
      try {
         await this.dbService.accessToken.delete({
            where: {
               token,
            },
         });

         return { message: 'Logged out seccessfully' };
      } catch (error) {
         throw new UnauthorizedException();
      }
   }

   async isTokenValid(token: string): Promise<boolean> {
      const found = await this.dbService.accessToken.findUnique({
         where: { token: token },
      });

      return Boolean(found);
   }
}
