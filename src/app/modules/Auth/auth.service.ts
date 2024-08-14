import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';
import AppError from '../../../errors/AppError';
import httpStatus from 'http-status';
import { PasswordHelpers } from '../../../helpers/passwordHelpers';

const login = async (payload) => {
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

  return isExist;
};

//REGISTER
const register = async (payload: User): Promise<User> => {
  const newUser = await prisma.user.create({
    data: payload,
  });
  return newUser;
};
const logout = async (payload) => {
  //
};

export const AuthServices = { login, register, logout };
