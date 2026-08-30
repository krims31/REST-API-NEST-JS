import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}
}
