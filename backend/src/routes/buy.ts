import Router from 'koa-router';
import { buy } from '../controllers/buy';

export const buyRouter = new Router();

buyRouter.post('/', buy);
