import { Response, NextFunction } from 'express';
import { Users } from '../models/User';
import { verifyToken } from '../utils/jwt';
import { AppError } from './error.middleware';
import { MyUserRequest } from '../types/custom';

export const userAuth = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers?.authorization; //Bearer eufoaf
    if (!header || !header?.startsWith('Bearer ')) {
      next(new AppError(401, 'User is not authorised'));
    }
    //Split the header and grap the token at index 1
    const token = header?.split(' ')[1];
    //Verifytoken func returns the payload that was signed to the token
    const payload: any = verifyToken(token);
    //The payload contains a userID
    const user = await Users.findOne({ _id: payload?.userID }, { email: 1 });
    //Verify if user exists
    if (!user) {
      next(new AppError(401, 'User is not authorised'));
    }
    //Attach user from db to the req interface
    req.user = user;
    //Move to the next middleware
    next();
  } catch (error) {
    next(new AppError(401, 'User is not authorised'));
  }
};

// import { IUser } from './../utils/types';
// import { Response, NextFunction, Request } from 'express';
// import { AppError } from './error.middleware';
// import { verifyToken } from '../utils/jwt';
// import { Users } from '../models/User';

// export const userAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const header = req.headers.authorization;
//     if (!header || header?.startsWith('Bearer ')) {
//       next(new AppError(401, 'User is not authorized'));
//     }

//     const token = header?.split(' ')[1];
//     const payload: any = verifyToken(token);
//     console.log(payload);
//     const user = await Users.findOne<IUser>({
//       _id: payload?.userID,
//     });
//     if (!user) {
//       next(new AppError(401, 'User is not authorized'));
//     }

//     req.user = user;
//     console.log(user);
//     next();
//   } catch (error) {
//     next(new AppError(401, 'User is not authorized'));
//   }
// };
