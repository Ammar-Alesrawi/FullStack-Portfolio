import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  createProject(
    @Body()
    data: {
      title: string;
      description: string;
      projectLink: string;
      imageLink: string;
      adminId: string;
    },
  ) {
    return this.projectService.createProject(data);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
