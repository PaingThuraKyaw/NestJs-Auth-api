import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './typed';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  singup(@Body() sign: SignIn) {
    console.log(sign);

    return this.authService.signUp();
  }

  @Post('sign-in')
  singin() {
    return this.authService.signIn();
  }
}
