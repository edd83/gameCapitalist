import { ObjectId } from "mongodb";

export interface Business {
  _id: ObjectId;
  name: string;
  level: number;
  cost: number;
  active: boolean;
  profit: number;
  multipleCoef: number;
  speed: number;
  managed: boolean;
  time: number;
}