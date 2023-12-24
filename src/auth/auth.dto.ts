import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsNotEmpty()
   @MinLength(8)
   pwd: string;
}

export class RegisterDto {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsNotEmpty()
   @MinLength(8)
   pwd: string;

   @IsNotEmpty()
   name: string;
}
