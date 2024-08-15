import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';
import AppError from '../../../errors/AppError';
import httpStatus from 'http-status';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

/**
 * Authenticates a user by checking their email and password, and returns a JSON Web Token (JWT) access token and refresh token if the credentials are valid.
 *
 * @param {ILoginUser} payload - The user's email and password.
 * @return {ILoginUserResponse} An object containing the JWT access token and refresh token.
 */
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

  return {
    accessToken,
    refreshToken,
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
    accessToken,
    refreshToken,
  };
};
const logout = async (payload) => {
  //
};

export const AuthServices = { login, register, logout };
