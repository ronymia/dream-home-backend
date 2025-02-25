import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthServices } from './auth.service';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import config from '../../../config';
import { JwtPayload } from 'jsonwebtoken';

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

// LOGIN
const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.login(loginData);

  const { refreshToken, ...restResult } = result;

  // SET REFRESH TOKEN COOKIES
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
  // / SET REFRESH TOKEN TO COOKIE
  const cookieOptions = {
    secure: config.node_env === 'product',
    httpOnly: true,
  };
  res.clearCookie('refreshToken', cookieOptions);

  //
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logout successfully',
    data: 'success',
  });
});

// LOG OUT
const onAuthStateChange = catchAsync(async (req, res) => {
  const result = await AuthServices.onAuthStateChange(req?.user as JwtPayload);
  // SEND RESPONSE
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user information get successfully',
    data: result,
  });
});

export const AuthControllers = { login, register, logout, onAuthStateChange };
