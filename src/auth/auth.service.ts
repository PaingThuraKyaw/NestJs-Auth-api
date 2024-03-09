import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { payloadProp } from './typed';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signUp(payload: payloadProp) {
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
  async signIn(payload: payloadProp) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const matchPassword = await argon.verify(user.password, payload.password);

    if (!matchPassword) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const token = await this.signToken(user.id, user.email);

    return { message: 'Login success', token };
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, { secret });
  }
}
