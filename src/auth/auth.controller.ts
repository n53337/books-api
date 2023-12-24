import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   async login() {}

   @Post('register')
   async register(@Body() body: RegisterDto) {
      const user = await this.authService.register(body);
      return user;
   }

   @Post('logout')
   async signOut() {}
}
