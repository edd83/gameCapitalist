import Router from 'koa-router';
import { updateRouter } from './update';
import { levelupRouter } from './levelup';
import { manageRouter } from './manage';
import { buyRouter } from './buy';
import { restartRouter } from './restart';

export const appRouter = new Router({
  prefix: '/v1'
});

appRouter.use('/update', updateRouter.routes(), updateRouter.allowedMethods());
appRouter.use('/levelup', levelupRouter.routes(), levelupRouter.allowedMethods());
appRouter.use('/manage', manageRouter.routes(), manageRouter.allowedMethods());
appRouter.use('/buy', buyRouter.routes(), buyRouter.allowedMethods());
appRouter.use('/restart', restartRouter.routes(), restartRouter.allowedMethods());
