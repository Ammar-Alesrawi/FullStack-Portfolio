import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (
      !admin ||
      !(await this.authService.comparePasswords(password, admin.password))
    ) {
      return { message: 'Invalid credentials' };
    }

    const token = await this.authService.generateToken({
      id: admin.id,
      email: admin.email,
    });
    return { token };
  }
}
