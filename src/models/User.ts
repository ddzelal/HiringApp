import { Schema, model } from 'mongoose';
import { IUser } from '../utils/types';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //created at and update_at
);

export const Users = model<IUser>('users', userSchema);
