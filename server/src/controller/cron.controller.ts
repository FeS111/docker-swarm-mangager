import { CronJob } from 'cron';

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
