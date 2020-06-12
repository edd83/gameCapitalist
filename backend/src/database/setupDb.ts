import mongoose from 'mongoose';
import fs from 'fs';

export let Game: mongoose.Model<mongoose.Document, Object>;

export async function cleanGamesCollection(): Promise<void> {
  const dropPromise = new Promise((resolve) => {
    mongoose.connection.on('open', async (_) => {
      await mongoose.connection.db.listCollections().toArray((_, names) => {
        if (names.filter((elem) => elem.name === 'games').length) {
          mongoose.connection.dropCollection('games');
        }
      });
      resolve();
    });
  });
  await dropPromise;
}

export async function addGamesCollection(): Promise<void> {
  cleanGamesCollection();

  const gameJsonPromise = new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../../src/database/game.json`, 'utf8', (err: NodeJS.ErrnoException | null, jsonString: string): void => {
      if (err) {
        console.log('File read failed:', err);
        reject();
      }
      resolve(JSON.parse(jsonString));
    });
  });

  const Schema = mongoose.Schema;
  const businessSchema = new Schema({
    active: Boolean,
    cost: Number,
    level: Number,
    managed: Boolean,
    multipleCoef: Number,
    name: String,
    profit: Number,
    speed: Number,
    time: Number
  });
  const gameSchema = new Schema({
    businesses: [businessSchema],
    money: Number,
    multiple: Number
  });
  Game = mongoose.model('Game', gameSchema);

  const dataGame = await gameJsonPromise;
  const newGame = new Game(dataGame);
  await newGame.save();
}
