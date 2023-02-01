import Joi from 'joi';
import { ICompany, ILocation, IUser } from './types';

//when the user logs in

export const validateLoginData = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.valid(login);
};

//when the user register

export const validateUserData = (user: IUser) => {
  const userSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
    name: Joi.string().min(2).max(20).required(),
    active: Joi.boolean(),
  });
  console.log(userSchema.valid(user));
  return userSchema.valid(user);
};

export const validateCompanyDate = (company: ICompany) => {
  const locationSchema = Joi.object<ILocation>({
    city: Joi.string().min(2).required(),
    country: Joi.string().min(2),
  });
  const companySchema = Joi.object<ICompany>({
    location: Joi.object(locationSchema).required(),
    about: Joi.string().required(),
    companySize: Joi.number().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(20).required(),
    userID: Joi.any(),
    website: Joi.string().required(),
  });

  return companySchema.valid(company);
};
