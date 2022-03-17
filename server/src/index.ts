import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import { syncServices } from './docker/service';
config()

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT ?? 8080, async () => {
  console.log(`Server is listening on port "${process.env.PORT ?? 8080}"`);
  syncServices();
});


