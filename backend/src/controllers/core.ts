import { Document } from 'mongoose';
import { Game } from "../database/setupDb";
import { Business } from "../interface/business";

export async function reduceMoney(cost: number): Promise<Document | null> {
  const obj = await Game.findOneAndUpdate({}, {$inc : {'money': -cost}}, { new: true });
  return obj;
}

export async function buyManager(name: string, profit: number, cost: number, speed: number): Promise<number> {
  const obj = await reduceMoney(cost);
  setInterval((): void => {
    updateMoneyByBizName(name);
  }, speed);
  console.log('Manager bought for ' + cost + ', money is ' + obj?.toObject().money + ', profit is ' + profit + ', and will update money every ' + speed/1000 + 's');
  return obj?.toObject().money;
}

export async function updateMoneyByBizName(name: string): Promise<void> {
  const firstDoc = await Game.findOneAndUpdate({'businesses.name': name}, {$set: {"businesses.$.time": Date.now()}}, {new: true});
  const businessJson = JSON.parse(JSON.stringify(firstDoc?.toObject().businesses.filter((elem: Business): boolean => elem.name === name)[0]));
  console.log('Time updated to ' + businessJson.time);
  const updatedDoc = await Game.findOneAndUpdate({}, {$inc : {'money': businessJson.profit}}, { new: true });
  console.log('update money, it is now on ' + updatedDoc?.toObject().money);
}