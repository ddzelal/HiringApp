import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
    this.stack = process.env.NODE_ENV === 'production' ? '' : this.stack;
  }
}

const errorHandler: ErrorRequestHandler = (
  error: any | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = error.code || 500;
  const message = error.message;

  if (!(error instanceof AppError)) {
    return res.status(code).send({
      message: 'The problem is on our end.We are working on fixing it.',
      success: false,
      data: null,
    });
  }

  res.status(code).send({
    message,
    success: false,
    data: null,
  });
};

export default errorHandler;
