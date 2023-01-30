//Declaration Merging... Attaching a user property to the Request interface
// declare nahttps://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2QyYTQzYTAyNzA4ZWZjODdlMDMwYTciLCJpYXQiOjE2NzQ4NTEzMTR9.UHwtvby8dryVBYps8YMfu3XxZfIc8oa-j4zNTlVbAJAmespace Express {
//   export interface Request {
//     user: any;
//   }
// }

import { Request } from 'express';

interface MyUserRequest extends Request {
  // Use `user?:` here instead of `user:`.
  user?: any;
}
