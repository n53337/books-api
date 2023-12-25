import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.metadata';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Public()
   @Post('login')
   async login(@Body() creds: LoginDto) {
      const token = await this.authService.login(creds);
      return { message: 'Logged in successfully', access_token: token };
   }

   @Public()
   @Post('register')
   async register(@Body() body: RegisterDto) {
      const user = await this.authService.register(body);
      return user;
   }

   @Post('logout')
   async signOut() {
      return { message: 'logged out successfully' };
   }
}
