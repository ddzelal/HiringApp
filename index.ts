import { connectDB } from './src/database/db';
import express, { Request, Response } from 'express';
import authRoutes from './src/routes/authRoutes';
import errorHandler from './src/middleware/error.middleware';
import morgan from 'morgan';
import usersRoutes from './src/routes/userRoutes';
import companyRoutes from './src/routes/companyRoutes';
import { userAuth } from './src/middleware/auth.middleware';

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use('/users', userAuth, usersRoutes);
app.use('/companies', userAuth, companyRoutes);
app.use('/auth', authRoutes);

//Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
  connectDB();
});
