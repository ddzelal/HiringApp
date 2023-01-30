import { Schema, model, Types } from 'mongoose';
import { ICompany, ILocation } from '../utils/types';

const locationSchema = new Schema<ILocation>({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const companySchema = new Schema<ICompany>(
  {
    location: {
      type: locationSchema,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    companySize: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    userID: {
      type: Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  { timestamps: true }
);

export const Companies = model<ICompany>('companies', companySchema);
