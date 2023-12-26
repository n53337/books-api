import {
   ExecutionContext,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './auth.metadata';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
   constructor(private reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
         IS_PUBLIC_KEY,
         [context.getHandler(), context.getClass()],
      );

      if (isPublic) {
         return true;
      }

      return super.canActivate(context);
   }
}
