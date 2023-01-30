//USER MODEL

import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  active: boolean;
}

//FOR COMPANY

export interface ILocation {
  country: string;
  city: string;
}

export interface ICompany {
  name: string;
  location: ILocation;
  companySize: number;
  email: string;
  about: string;
  website: string;
  userID: any;
}

//JOB Model

type seniorityTypes = 'entry' | 'junior' | 'intermediate' | 'senior';
type jobTypes = 'office' | 'remote' | 'hybrid';
export interface ISalaryRange {
  min: Number;
  max: Number;
}

export interface IJob {
  title: string;
  description: string;
  seniority: seniorityTypes;
  type: jobTypes;
  salaryRange: ISalaryRange;
  link: string;
  openingDate: Date;
  closingDate: Date;
  companyID: any;
}
