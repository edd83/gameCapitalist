import { Context } from 'koa';
import { Business } from '../interface/business';
import { Game } from '../database/setupDb';

export async function buy(ctx: Context): Promise<void> {
  const body = ctx.request.body;
  console.log(`body is : ${body}`);
  const obj = await Game.findOne({});
  const businessJson: Business = JSON.parse(JSON.stringify(obj?.toObject().businesses.filter(
    (elem: Business): boolean => elem.name === body.name)[0]));

  if (body.type === 'buyBusiness') {
    if (obj?.toObject().money < businessJson.profit) {
      ctx.body = 'Accepted but not completed';
      ctx.status = 202;
    } else {
      await Game.findOneAndUpdate({ 'businesses.name': body.name },
        { $inc: { money: -businessJson.profit }, $set: { 'businesses.$.active': true } });

      ctx.body = businessJson.profit;
      ctx.status = 201;
    }
  } else {
    await setTimeout(async (): Promise<void> => {
      const obj2 = await Game.findOneAndUpdate({}, { $inc: { money: businessJson.profit } }, { new: true });
      console.log(`money updated to ${obj2?.toObject().money}`);
    }, businessJson.speed);

    ctx.body = businessJson.speed;
    ctx.status = 201;
  }
}
