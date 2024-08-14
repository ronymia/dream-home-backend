import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthServices } from './auth.service';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';
import sendResponse from '../../../shared/sendResponse';
import { TUserLoginResponse } from './auth.interface';
import httpStatus from 'http-status';
import { User } from '@prisma/client';

const register = catchAsync(async (req: Request, res: Response) => {
  const { ...registerData } = req.body;
  console.log(registerData);

  registerData.password = await PasswordHelpers.passwordHash(registerData?.password);
  const result = await AuthServices.register(registerData);

  //   res.send(result);
  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User Register successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  //
  const {...loginData } = req.body;

  const result = await AuthServices.login(loginData);
  sendResponse
});
const logout = catchAsync(async (req, res) => {
  //
});

export const AuthControllers = { login, register, logout };
