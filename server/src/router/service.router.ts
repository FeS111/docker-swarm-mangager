import { Router } from 'express';
import { prisma } from '../controller/prisma.controller';
import { updateService } from '../docker/service';
import { DockerService } from '../intefaces/docker-service.interface';
import { PagingResult } from '../intefaces/paging-result.interface';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const data = await prisma.dockerService.findMany({
      include: {
        replicas: true,
        scheduledRestart: true
      },
      skip: offset,
      take: limit
    });
    const result: PagingResult<DockerService[]> = {
      limit,
      offset,
      results: data as DockerService[],
      max: await prisma.dockerService.count()
    };

    res.send(result);
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
