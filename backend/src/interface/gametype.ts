import { Business } from "./business";
import { ObjectId } from "mongodb";

export interface GameType {
  _id: ObjectId;
  money: number;
  multiple: number;
  businesses: Business[];
}