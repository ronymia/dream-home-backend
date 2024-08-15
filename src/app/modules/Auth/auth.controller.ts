import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthServices } from './auth.service';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import config from '../../../config';

const register = catchAsync(async (req: Request, res: Response) => {
  const { ...registerData } = req.body;

  registerData.password = await PasswordHelpers.passwordHash(
    registerData?.password,
  );
  const result = await AuthServices.register(registerData);

  //   res.send(result);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User Register successfully',
    data: result,
  });
});

//login
const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.login(loginData);

  const { refreshToken, ...restResult } = result;

  // set refresh token to cookie
  const cookieOptions = {
    secure: config.node_env === 'development' ? false : true,
    httpOnly: true,
  };

  // SET COOKIES
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // SEND RESPONSE
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: restResult,
  });
});

// LOG OUT
const logout = catchAsync(async (req, res) => {
  //
});

export const AuthControllers = { login, register, logout };
