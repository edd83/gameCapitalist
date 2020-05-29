import { app } from './server';
import { populateData } from './database/setupDb'
import Db from './database/connect';

export const db = Db.connect();

const port = process.env.PORT || 3001;
populateData();
app.listen(port, () => console.log(`API server started on ${port}`));
