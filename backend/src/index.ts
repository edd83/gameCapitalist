import { app } from './server';
import { addGamesCollection } from './database/setupDb';
import Db from './database/connect';

Db.connect();
addGamesCollection();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API server started on ${port}`));
