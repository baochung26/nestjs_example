import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { SendMail } from '../queue/send-mail';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    BullModule.registerQueue(
      {
        name: 'send-email',
      },
      {
        name: 'test-queue',
      },
    ),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, SendMail],
})
export class TasksModule {}
