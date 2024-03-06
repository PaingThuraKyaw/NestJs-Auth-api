import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignIn {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
