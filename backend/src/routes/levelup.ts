import Router from 'koa-router';
import { levelup } from '../controllers/levelup';

export const levelupRouter = new Router();

levelupRouter.post('/', levelup);
