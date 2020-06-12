import mongoose from 'mongoose';
import { Configuration } from '../config/config';

class Db {
  public static connect(): Promise<void> {
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
      });
    });
    return mongoose.connect(Configuration.DB_URI,
      { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then(
      () => console.log('Connected to MongoDB')
    ).catch((err: Error): void => {
      console.error(`MongoDB connection error. ${err}`);
      process.exit(1);
    });
  }
}

export default Db;
