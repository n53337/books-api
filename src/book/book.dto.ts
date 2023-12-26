import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewBookTdo {
   @IsNotEmpty()
   name: string;

   @IsOptional()
   authorId: number;
}
