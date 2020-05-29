import { Context } from 'koa';
import { Game } from '../database/setupDb';
import { Business } from '../interface/business';

export async function levelup(ctx: Context): Promise<void> {
  const body = ctx.request.body;
  console.log('body is : ' + body);
  const obj = await Game.findOne({});
  const businessJson: Business = JSON.parse(JSON.stringify(obj?.toObject().businesses.filter((elem: Business): boolean => elem.name === body.name)[0]));
  const obj2 = await Game.findOneAndUpdate({'businesses.name': body.name}, {$inc: {"businesses.$.level": 1, "money": -businessJson.profit}, $mul: {"businesses.$.profit": businessJson.multipleCoef}}, {new: true});

  console.log('levelup' + businessJson.level)
  console.log(obj2?.toObject().businesses);

  ctx.body = 'ok';
  ctx.status = 201;
}
