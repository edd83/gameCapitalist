import Router from 'koa-router';
import { manage } from '../controllers/manage';

export const manageRouter = new Router();

manageRouter.post('/', manage);
