import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthJwtGuard } from './auth-jwt.guard';

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
   providers: [
      AuthService,
      JwtService,
      JwtStrategy,
      { provide: APP_GUARD, useClass: AuthJwtGuard },
   ],
})
export class AuthModule {}
