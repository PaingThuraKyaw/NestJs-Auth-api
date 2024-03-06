import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SignUp } from './typed';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(payload: SignUp) {
    const hash = (await argon.hash(payload.password)).toString();

    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hash,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    });

    return user;
  }
  signIn() {}
}
