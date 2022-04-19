import { CronJob } from 'cron';
import { rebootService } from '../docker/service';
import { prisma } from './prisma.controller';

export const jobs: { [key: string]: CronJob } = {};

export function registerJob(id: string, cron: string, func: () => void) {
  jobs[id] = new CronJob(cron, func);
  jobs[id].start();
}

export function removeJob(id: string) {
  if (jobs[id]) {
    jobs[id].stop();
    delete jobs[id];
  }
}

export function stopJob(id: string) {
  if (jobs[id]) {
    jobs[id].stop();
  }
}

export async function loadCronJobs() {
  const services = await prisma.dockerService.findMany({ include: { scheduledRestart: true } });
  for (let service of services) {
    if (service.scheduledRestart?.active) {
      registerJob(service.serviceID, service.scheduledRestart.cron, () => {
        try {
          rebootService(service.serviceID);
        } catch (error) {
          console.log(error);
        }
      });
      console.log(`Loaded restart job '${service.scheduledRestart.cron}' for the service '${service.name}'.`);
    }
  }
}
