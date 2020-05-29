import mongoose from 'mongoose';
import fs from 'fs';

export let Game: mongoose.Model<mongoose.Document, {}>;

export async function populateData(): Promise<void> {
  cleanDb();

  const gameJsonPromise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/../../src/database/game.json', 'utf8', (err: NodeJS.ErrnoException | null, jsonString: string): void => {
      if (err) {
          console.log("File read failed:", err);
          reject();
      }
      resolve(JSON.parse(jsonString));
    });
  });

  const Schema = mongoose.Schema;
  const businessSchema = new Schema({
    name: String,
    level: Number,
    cost: Number,
    profit: Number,
    multipleCoef: Number,
    speed: Number,
    active: Boolean,
    managed: Boolean
  });
  const gameSchema = new Schema({
    money: Number,
    multiple: Number,
    businesses: [businessSchema]
  });
  Game = mongoose.model('Game', gameSchema);

  const dataGame = await gameJsonPromise;
  const newGame = new Game(dataGame);
  await newGame.save();
}

export function cleanDb(): void {
  mongoose.connection.dropCollection('games');
}
