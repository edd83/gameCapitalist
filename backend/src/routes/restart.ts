import Router from 'koa-router';
import { restart } from '../controllers/restart';

export const restartRouter = new Router();

restartRouter.post('/', restart);
