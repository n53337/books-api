import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   async login(@Body() creds: LoginDto) {
      const token = await this.authService.login(creds);
      return { message: 'Logged in successfully', access_token: token };
   }

   @Post('register')
   async register(@Body() body: RegisterDto) {
      const user = await this.authService.register(body);
      return user;
   }

   @UseGuards(AuthGuard())
   @Post('logout')
   async signOut() {
      return { message: 'logged out successfully' };
   }
}
