import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-email')
export class SendMail {
  @Process('send-email-job')
  async test(job: Job<unknown>) {
    console.log(job.data);
  }
}
