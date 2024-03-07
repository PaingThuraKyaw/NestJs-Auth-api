import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { payloadProp } from './typed';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  singup(@Body() payload: payloadProp) {
    return this.authService.signUp(payload);
  }

  @Post('sign-in')
  singin(@Body() payload: payloadProp) {
    return this.authService.signIn(payload);
  }
}
