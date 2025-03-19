import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects(): Promise<Project[]> {
    return this.prisma.project.findMany({ include: { skills: true } });
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
      include: { skills: true },
    });
  }

  async createProject(data: {
    title: string;
    description: string;
    projectLink: string;
    imageLink: string;
    adminId: string;
  }): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async deleteProject(id: string): Promise<Project> {
    return this.prisma.project.delete({ where: { id } });
  }
}
