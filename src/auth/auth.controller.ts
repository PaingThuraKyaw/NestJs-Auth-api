import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUp } from './typed';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  singup(@Body() payload: SignUp) {
    return this.authService.signUp(payload);
  }

  @Post('sign-in')
  singin() {
    return this.authService.signIn();
  }
}
