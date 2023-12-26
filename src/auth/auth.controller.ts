import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
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
   async signOut(@Req() req: Request) {
      const token = req.headers['authorization'].split(' ')[1];
      const response = await this.authService.logOut(token);

      return response;
   }
}
