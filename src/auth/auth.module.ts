import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports: [
      JwtModule.register({
         secret: process.env.JWT_SECRET,
      }),
      PassportModule.register({
         defaultStrategy: 'jwt',
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
