import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../interface/task.interface';
import { CreateTaskDto } from './../dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.id++,
      ...createTaskDto,
      description: createTaskDto.description ?? '',
      createdAt: new Date(),
      status: createTaskDto.status ?? false,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number) {
    return this.findTaskById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const existingTask = this.findTaskById(id);

    const index = this.tasks.findIndex((task) => task.id === id);

    this.tasks[index] = {
      ...existingTask,
      ...updateTaskDto,
    };

    return this.tasks[index];
  }

  updateStatus(id: number, status: boolean): Task {
    const task = this.findTaskById(id);
    task.status = status;
    return task;
  }

  remove(id: number): void {
    this.findTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  private findTaskById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
