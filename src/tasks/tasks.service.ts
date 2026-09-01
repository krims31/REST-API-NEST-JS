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

  findByStatus(isStatus: boolean): Task[] {
    return this.tasks.filter((task) => task.status === isStatus);
  }

  search(query: string): Task[] {
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  complete(id: number) {
    const task = this.findTaskById(id);
    task.status = true;
    return task;
  }

  incomplete(id: number) {
    const task = this.findTaskById(id);
    task.status = false;
    return task;
  }

  findOne(id: number) {
    return this.findTaskById(id);
  }

  statistic() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.status).length;

    const pending = total - completed;

    return {
      total,
      completed,
      pending,
      completedRate:
        total > 0 ? ((completed / total) * 100).toFixed(2) + '%' : '0%',
    };
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

  pagination(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return this.tasks.slice(startIndex, endIndex);
  }

  removeMany(ids: number[]): { deleted: number } {
    let deleted = 0;

    ids.forEach((id) => {
      try {
        this.findTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
        deleted++;
      } catch (error) {
        console.error('Remove many not a task', error);
      }
    });
    return { deleted };
  }

  private findTaskById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
