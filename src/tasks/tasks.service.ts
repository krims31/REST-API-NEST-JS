import { Injectable } from '@nestjs/common';
import { Task } from '../interface/task.interface';
import { CreateTaskDto } from './../dto/create-task.dto';

@Injectable()
export class TasksService {
  private task: Task[] = [];
  private id = 1;

  create(createTaskDto: CreateTaskDto): Task {}

	findAll(): Task[] {
		return this.task;
	}

	findOne(id: number) {
		return this.task.find((task) => task.id === id);
	}

	update(id: number, updateTaskDto: any): Task {
		
	}

	remove(id: number): void {

	}

	private findTaskById(id: number) {
		try {
			return this.task.find((task) => task.id === id);
		} catch (error) {
			throw new Error('Task not found');
		}
	}
}
