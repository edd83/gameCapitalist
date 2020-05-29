import { agent } from 'supertest';
import { app } from '../src/server';
import Db from '../src/database/connect';
import { populateData } from '../src/database/setupDb';

describe('healthcheck', () => {
  it('should return 201 for successful connection', async () => {
    await Db.connect();
    await populateData();

    const result = await agent(app.callback()).get(`/v1/update`).send();
    expect(result.status).toBe(201);
  });
});
