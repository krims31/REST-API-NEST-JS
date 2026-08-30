import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskIdDto } from './dto/create-taskId.dto';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTasks(): string {
    return this.appService.getTasks();
  }

  @Get(':id')
  getTasksId(): CreateTaskIdDto {
    return this.appService.getTasksId();
  }

  @Post()
  create(@Body() task: CreateTaskDto): string {
    return this.appService.create(task);
  }
}
