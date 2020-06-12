import { Context } from 'koa';
import { Game } from '../database/setupDb';
import { Business } from '../interface/business';
import { buyManager } from './core';

export async function manage(ctx: Context): Promise<void> {
  const body = ctx.request.body;
  console.log(`body is : ${body}`);
  const obj = await Game.findOneAndUpdate(
    { 'businesses.name': body.name },
    { $set: { 'businesses.$.managed': true } }
  );

  const businessJson = JSON.parse(JSON.stringify(obj?.toObject().businesses.filter(
    (elem: Business): boolean => elem.name === body.name)[0]));
  console.log(businessJson.speed);

  await buyManager(body.name, businessJson.profit, businessJson.cost, businessJson.speed);

  ctx.body = businessJson.speed;
  ctx.status = 201;
}
