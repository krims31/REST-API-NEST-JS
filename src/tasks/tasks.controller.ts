import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // ✅ Статические маршруты
  @Get('stats')
  statistic() {
    return this.tasksService.statistic();
  }

  @Get()
  findAll(
    @Query('pagination') paginationDto: PaginationDto,
    page: number,
    limit: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    if (search) {
      return this.tasksService.search(search);
    }
    if (status !== undefined) {
      const isStatus = status === 'true';
      return this.tasksService.findByStatus(isStatus);
    }
    return this.tasksService.findAll();
  }

  // ✅ Динамические маршруты
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.complete(id);
  }

  @Patch(':id/incomplete')
  incomplete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.incomplete(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: boolean,
  ) {
    return this.tasksService.updateStatus(id, status);
  }

  // ✅ Статические маршруты
  @Delete('bulk')
  removeMany(@Body('ids') ids: number[]) {
    return this.tasksService.removeMany(ids);
  }

  // ✅ Динамические маршруты
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
