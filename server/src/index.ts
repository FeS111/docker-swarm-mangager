import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { syncServices } from './docker/service';
import { router as serviceRouter } from './router/service.router';
config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/service', serviceRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(process.env.PORT ?? 8080, async () => {
  console.log(`Server is listening on port "${process.env.PORT ?? 8080}"`);
  syncServices();
});
