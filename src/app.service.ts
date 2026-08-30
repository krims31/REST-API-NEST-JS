import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskIdDto } from './dto/create-taskId.dto';

@Injectable()
export class AppService {
  private tasks: Task[] = [];
  getTasks(): string {
    return 'Tasks 1';
  }

  getTasksId(): CreateTaskIdDto {
    return {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: true,
    };
  }

  create(task: CreateTaskDto): string {
    return `Task ${task.title} created`;
  }
}
