import Router from 'koa-router';
import { update } from '../controllers/update';

export const updateRouter = new Router();

updateRouter.get('/', update);
