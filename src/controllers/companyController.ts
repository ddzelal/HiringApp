import { AppError } from './../middleware/error.middleware';
import { Response, NextFunction } from 'express';
import { Companies } from '../models/Company';
import { MyUserRequest } from '../types/custom';

export const getCompany = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyID = req.params.companyID;
    const userID = req.user._id;
    const company = await Companies.find({ _id: companyID, userID });
    if (!company) {
      throw new AppError(404, 'Company not found');
    }
    res.status(200).send({
      message: 'Company details',
      data: company,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const per_page = req.query?.per_page
      ? parseInt(req.query?.per_page as string)
      : 10;
    const page = req.query?.page ? parseInt(req.query?.page as string) : 1;
    const userID = req.user._id;
    const companies = await Companies.find({ userID })
      .limit(per_page)
      .skip((page - 1) * per_page);
    if (!companies) {
      throw new AppError(404, 'Companies not found');
    }
    res.status(200).send({
      message: 'Companies details',
      data: companies,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const addNewCompany = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user._id;
    const newCompany = { ...req.body, userID: userID };
    const saved = await Companies.create(newCompany);
    if (!saved) {
      throw new AppError(400, 'Failed to add new company');
    }
    res.status(201).send({
      message: 'Company was created',
      data: saved,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCompany = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user._id;
    const companyID = req.params.companyID;
    const company = { ...req.body, userID: userID };
    const updated = await Companies.findOneAndUpdate(
      {
        _id: companyID,
        userID: userID,
      },
      company,
      { new: true }
    );
    if (!updated) {
      throw new AppError(400, 'Failed to update company');
    }
    res.status(201).send({
      message: 'Company was updated',
      data: updated,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
