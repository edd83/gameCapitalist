import Koa, { Context } from 'koa';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cors from '@koa/cors';
import Helmet from 'koa-helmet';
import serve from 'koa-static';

import koaResponse from 'koa-response2';
import { appRouter } from './routes/index';

export const app = new Koa();

app.use(async (_ctx: Context, next: () => Promise<void>): Promise<void> => {
  try {
    await next();
  } catch (err) {
    console.log(`${err.name} ${err}`);
  }
});

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

app.use(Cors());
app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  onerror: (err: Error, ctx: Context): void => {
    ctx.throw(`Body parse error with message ${err.message}`, 422);
  },
  strict: true
}));

app.use(koaResponse());

// API routes
app.use(appRouter.routes());
app.use(serve('./build'));
app.use(appRouter.allowedMethods());
