import { ObjectId } from 'mongodb';
import { Business } from './business';

export interface GameType {
  _id: ObjectId;
  money: number;
  multiple: number;
  businesses: Business[];
}
