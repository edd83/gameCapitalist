import { ObjectId } from "mongodb";

export interface Business {
  _id: ObjectId;
  name: string;
  level: number;
  cost: number;
  profit: number;
  multipleCoef: number;
  speed: number;
  active: boolean;
  managed: boolean;
}