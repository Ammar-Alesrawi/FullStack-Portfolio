import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Admin } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async getAdminById(id: string): Promise<Admin | null> {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async createAdmin(data: {
    name: string;
    email: string;
    password: string;
    imageLink: string;
    job: string;
  }): Promise<Admin> {
    const hashedPassword = await this.authService.hashPassword(data.password);
    return this.prisma.admin.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async deleteAdmin(id: string): Promise<Admin> {
    return this.prisma.admin.delete({ where: { id } });
  }
}
