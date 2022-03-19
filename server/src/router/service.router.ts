import { Router } from 'express';
import { prisma } from '../controller/prisma.controller';
import { updateService } from '../docker/service';
import { DockerService } from '../intefaces/docker-service.interface';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.send(await prisma.dockerService.findMany());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await prisma.dockerService.findFirst({
        where: {
          serviceID: { equals: req.params.id }
        },
        include: {
          replicas: true,
          scheduledRestart: true
        }
      })
    );
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    res.send(await updateService(req.body as DockerService));
  } catch (error) {
    next(error);
  }
});
