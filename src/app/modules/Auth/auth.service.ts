/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';
import AppError from '../../../errors/AppError';
import httpStatus from 'http-status';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  //
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  //CHECK USER IF NOT EXIST
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //PASSWORD MATCH
  const isMatchPassword = await PasswordHelpers.passwordMatch(
    payload.password,
    isExist.password,
  );
  if (!isMatchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // create JWT token and refresh token
  const { id: userId, role } = isExist;
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  if (isExist?.password) {
    delete (isExist as any)?.password;
  }

  return {
    token: accessToken,
    refreshToken,
    user: isExist,
  };
};

//REGISTER
const register = async (payload: User): Promise<ILoginUserResponse> => {
  const newUser = await prisma.user.create({
    data: payload,
  });

  // create JWT token and refresh token
  const { id: userId, role } = newUser;
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    token: accessToken,
    refreshToken,
  };
};
const logout = async (payload) => {
  //
};

export const AuthServices = { login, register, logout };
