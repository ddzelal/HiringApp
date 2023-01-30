import { AppError } from './../middleware/error.middleware';
import { connect, set } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
  try {
    set('strictQuery', false);
    connect(process.env.DB_URI as string, (error) => {
      if (error) {
        throw new AppError(500, 'Something terrible happened');
      }
      console.log('We are connected to the database');
    });
  } catch (error) {
    throw new AppError(500, 'Something terrible happened');
  }
};
