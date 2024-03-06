import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUp {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
