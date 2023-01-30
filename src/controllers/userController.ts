import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/error.middleware';
import { Users } from '../models/User';
import bcrypt from 'bcrypt';
import { assignToken } from '../utils/jwt';
import { MyUserRequest } from '../types/custom';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!password || !email) {
      throw new AppError(400, 'Email or password is incorrect');
    }

    const user = await Users.findOne({
      email,
      active: true,
    });
    const deactivatedUser = await Users.findOne({
      email,
      active: false,
    });
    if (deactivatedUser) {
      throw new AppError(400, 'User is deactivated');
    }
    if (!user) {
      throw new AppError(400, 'User does not exits');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(400, 'Email or password do not match our records');
    }

    const token = assignToken({ userID: user.id });

    res.status(200).send({
      messages: 'User now logged in',
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    const name = req.body?.name;
    if (!name || !password || !email) {
      throw new AppError(400, 'User provided invalid details');
    }
    const user = await Users.findOne({
      email: email,
    });
    if (user) {
      throw new AppError(401, 'User already exits');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new AppError(400, 'Failed to register a new user. Try again');
    }

    const token = assignToken({ userID: newUser.id });

    res.status(201).send({
      messages: 'User is successfully registered ',
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, email } = req?.user;
    const user = await Users.findOne(
      { _id, email },
      { email: 1, name: 1, active: 1 }
    );
    if (!user) {
      throw new AppError(401, 'User does not exist');
    }
    res.status(200).send({
      message: 'User details',
      success: true,
      data: user,
    });
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, email } = req.user;
    const name = req.body.name;
    if (!name) {
      throw new AppError(400, 'No user details to update');
    }
    const updatedUser = await Users.findOneAndUpdate(
      { _id, email },
      {
        name,
      },
      { new: true }
    ).select('email name');

    res.status(200).send({
      data: updatedUser,
      success: true,
      messages: 'user successfully updated',
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, email } = req.user;
    const deactivatedUser = await Users.findOneAndUpdate(
      {
        _id,
        email,
      },
      {
        active: false,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      message: 'User is successfully deactivated',
      success: true,
      data: deactivatedUser,
    });
  } catch (error) {
    next(error);
  }
};
