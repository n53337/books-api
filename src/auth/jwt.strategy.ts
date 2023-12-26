import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { DbService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
   private readonly authService = new AuthService(
      new DbService(),
      new JwtService(),
   );

   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: process.env.JWT_SECRET,
         passReqToCallback: true,
      });
   }

   async validate(req: Request, payload: any) {
      const token = req.headers.authorization.split(' ')[1];
      const isTokenValid = await this.authService.isTokenValid(token);

      if (!isTokenValid) return false;

      return { userId: payload.sub, username: payload.username };
   }
}
