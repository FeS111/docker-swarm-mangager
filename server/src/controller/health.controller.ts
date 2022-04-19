import axios from 'axios';
import { HealthCheckOptions } from '../intefaces/health-check-options.interface';
import { registerJob } from './cron.controller';

export async function registerHealthCheck(options: HealthCheckOptions) {
  registerJob(options.service.serviceID, options.interval, async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  });
}

export async function healthCheck(options: HealthCheckOptions) {
  switch (options.type) {
    case 'HTTP': {
      await httpHealthCheck(options);
    }
    default: {
      throw 'no-valid-type';
    }
  }
}

export async function httpHealthCheck(options: HealthCheckOptions): Promise<boolean> {
  const response = await axios.request({
    method: options.method,
    url: `${options.host}:${options.port}${options.path}`,
    data: options.body
  });

  if (options.success.code) {
    return response.status === options.success.code;
  }
  if (options.success.body) {
    return response.data === options.success.body;
  }
  if (options.success.bodyContains) {
    return JSON.stringify(response.data).includes(options.success.bodyContains);
  }
  return false;
}
