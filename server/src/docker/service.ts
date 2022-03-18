import { prisma } from '../controller/prisma.controller';
import { DockerService } from '../intefaces/docker-service.interface';
import { exec } from '../util/shell';

export async function getServices(): Promise<DockerService[]> {
  const res = await runDocker('service ls');
  let servicesRaw = res.split('\n');
  servicesRaw.shift();
  servicesRaw.pop();
  return servicesRaw.map(parseService);
}

export async function getService(serviceId: string): Promise<DockerService> {
  const res = await runDocker(`service ls | grep ${serviceId}`);
  let serviceRaw = res.split('\n');
  serviceRaw.pop();
  return parseService(serviceRaw[0]);
}

export async function scaleService(serviceId: string, desired: number, update = true) {
  try {
    await runDocker(`service scale ${serviceId}=${desired}`);
    if (update) {
      const service = getService(serviceId);
      // prisma.dockerService.update({
      //   data: service
      // })
    }
  } catch (error) {
    console.log(error);
  }
}

export async function rebootService(serviceId: string) {
  try {
    const service = await getService(serviceId);
    // await runDocker(`service scale ${serviceId}=${desired}`);
  } catch (error) {
    console.log(error);
  }
}

export async function syncServices() {
  const services = await getServices();
  for (let service of services) {
    if (
      await prisma.dockerService.findFirst({
        where: {
          serviceID: {
            equals: service.serviceID
          }
        }
      })
    ) {
      await prisma.dockerService.update({
        where: {
          serviceID: service.serviceID
        },
        data: {
          image: service.image,
          mode: service.mode,
          name: service.name,
          serviceID: service.serviceID,
          portMapping: service.portMapping,
          replicas: {
            update: {
              available: service.replicas.available,
              unavailable: service.replicas.unavailable,
              desired: service.replicas.desired
            }
          }
        }
      });
    } else {
      await createService(service);
    }
  }
}

async function createService(service: DockerService) {
  return await prisma.dockerService.create({
    data: {
      image: service.image,
      mode: service.mode,
      name: service.name,
      serviceID: service.serviceID,
      portMapping: service.portMapping,
      replicas: {
        create: {
          available: service.replicas.available,
          unavailable: service.replicas.unavailable,
          desired: service.replicas.desired
        }
      }
    }
  });
}

async function updateService(service: DockerService) {
  return await prisma.dockerService.update({
    where: {
      serviceID: service.serviceID
    },
    data: {
      image: service.image,
      mode: service.mode,
      name: service.name,
      serviceID: service.serviceID,
      portMapping: service.portMapping,
      replicas: {
        update: {
          available: service.replicas.available,
          unavailable: service.replicas.unavailable,
          desired: service.replicas.desired
        }
      }
    }
  });
}

function parseService(line: string): DockerService {
  const arr = line.split(' ').filter(el => el != '');
  const rep = arr[3].split('/');
  return {
    serviceID: arr[0],
    name: arr[1],
    mode: arr[2],
    replicas: {
      available: Number(rep[0]),
      desired: Number(rep[1]),
      unavailable: Number(rep[1]) - Number(rep[0])
    },
    image: arr[4],
    portMapping: arr[5]
  } as DockerService;
}

async function runDocker(command: string): Promise<string> {
  return exec(`DOCKER_HOST=${process.env.DOCKER_HOST} docker ${command}`);
}
