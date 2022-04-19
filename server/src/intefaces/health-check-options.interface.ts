import { DockerService } from '@prisma/client';

export interface HealthCheckOptions {
  type: 'HTTP';
  port: number;
  host: string;
  path: string;
  interval: string;
  service: DockerService;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  body?: { [key: string]: any };
  success: {
    code?: number;
    body?: { [key: string]: any };
    bodyContains?: string;
  };
}
