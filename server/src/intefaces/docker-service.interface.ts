import { ScheduledRestart } from './scheduled-restart.interface';

export interface DockerService {
  serviceID: string;
  name: string;
  mode: 'replicated' | 'global';
  replicas: {
    available: number;
    unavailable: number;
    desired: number;
  };
  image: string;
  portMapping?: string;
  scheduledRestart?: ScheduledRestart;
}
