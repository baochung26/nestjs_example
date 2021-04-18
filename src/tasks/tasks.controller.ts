import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe, ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  // @Get()
  // // @UsePipes(ValidationPipe)
  // getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.TasksService.getTasksWithFilters(filterDto);
  //   }
  //   console.log(filterDto);
  //   return this.TasksService.getAllTask();
  // }
  //
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe) // or @Body(ValidationPipe) bellow
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.TasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   return this.TasksService.deleteTask(id);
  // }
  //
  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.TasksService.updateTaskStatus(id, status);
  // }
}
