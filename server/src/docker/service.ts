import { prisma } from "../controller/prisma.controller";
import { DockerService } from "../intefaces/docker-service.interface";
import { exec } from "../util/shell";

export async function getServices(): Promise<DockerService[]> {
  const res = await runDocker('service ls');
  let servicesRaw = res.split('\n');
  servicesRaw.shift();
  servicesRaw.pop();
  return servicesRaw.map(el => {
    const arr = el.split(' ').filter(el => el != '');
    const rep = arr[3].split('/')
    return {
      serviceID: arr[0],
      name: arr[1],
      mode: arr[2],
      replicas: {
        available: Number(rep[0]),
        unavailable: Number(rep[1])
      },
      image: arr[4],
      portMapping: arr[5]
    } as DockerService
  });
}

export async function syncServices() {
  const services = await getServices();
  for (let service of services) {
    if (await prisma.dockerService.findFirst({
      where: {
        serviceID: {
          equals: service.serviceID
        }
      }
    })) {
      await prisma.dockerService.update({
        where:{
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
            unavailable: service.replicas.unavailable
          }
        }
      }});
    } else {
      await prisma.dockerService.create({data: {
        image: service.image,
        mode: service.mode,
        name: service.name,
        serviceID: service.serviceID,
        portMapping: service.portMapping,
        replicas: {
          create: {
            available: service.replicas.available,
            unavailable: service.replicas.unavailable
          }
        }
      }});
    }
  }
}

async function runDocker(command: string): Promise<string> {
  return exec(`DOCKER_HOST=${process.env.DOCKER_HOST} docker ${command}`);
}