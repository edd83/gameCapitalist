import { Context } from 'koa';
import { Game } from '../database/setupDb';

export async function update(ctx: Context): Promise<void> {
  const obj = await Game.findOne({});
  ctx.body =  obj?.toObject();
  ctx.status = 201;
}
