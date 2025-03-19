import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Post()
  createAdmin(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
      imageLink: string;
      job: string;
    },
  ) {
    return this.adminService.createAdmin(data);
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
